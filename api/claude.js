// Función de servidor (Vercel) para Consulta y Red team.
// La llave vive en la variable de entorno ANTHROPIC_API_KEY y nunca llega al navegador.
// El servidor fija las instrucciones, el modelo y las herramientas: el cliente solo manda el modo y el texto.
const fs = require("fs");
const path = require("path");

const MODEL = process.env.MEMORIA_MODEL || "claude-sonnet-5-5";
const MAX_INPUT = 1500;          // caracteres por pregunta o posición
const PER_IP_PER_HOUR = 12;      // tope por visitante (mejor esfuerzo, memoria de la instancia)
const DAILY_CAP = Number(process.env.MEMORIA_DAILY_CAP || 150); // tope global por día y por instancia

let FICHAS = null;
function load() {
  if (!FICHAS) {
    const d = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "fichas.json"), "utf8"));
    FICHAS = d.fichas.map(f => ({ ...f, _a: norm(f.afirmacion), _t: norm([f.id, f.agente, f.afirmacion, f.fuente, f.fecha, f.tipo].join(" ")) }));
  }
  return FICHAS;
}
function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
const STOP = new Set("de la el los las y o a en que por para con del al se su sus un una es como mas pero sin sobre entre lo le les fue ha han si no mexico estados unidos ee uu eeuu cual cuales quien quienes cuando donde porque".split(" "));
function terms(s) { return norm(s).replace(/[^a-z0-9.%\s-]/g, " ").split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)); }
function search(q, k) {
  const F = load(), ts = terms(q);
  if (!ts.length) return F.slice(0, k);
  const N = F.length, df = {};
  ts.forEach(t => { df[t] = F.filter(f => f._t.includes(t)).length; });
  return F.map(f => { let s = 0; ts.forEach(t => { if (df[t] && f._t.includes(t)) s += Math.log(1 + N / df[t]) * (f._a.includes(t) ? 1.6 : 1); }); return [s, f]; })
    .filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, k).map(x => x[1]);
}
const LV = { "1": "Oficial", "2": "Documentado", "3": "Deducción", "VACIO": "Vacío" };
function compact(f) {
  const p = [`[${f.id}] nivel=${f.nivel === "VACIO" ? "VACÍO" : f.nivel} (${LV[f.nivel]}) · ${f.agente} · fecha ${f.fecha || "s/f"}`, `Afirmación: ${f.afirmacion}`, `Fuente: ${f.fuente}`];
  if (f.premisas) p.push(`Premisas: ${f.premisas.join(", ")} · confianza ${f.confianza || "?"}`);
  if (f.sesgo) p.push(`Sesgo: ${f.sesgo}`);
  if (f.contradice) p.push(`Contradice a: ${f.contradice.join(", ")}`);
  return p.join("\n");
}

const SYS_Q = `Eres el módulo de consulta de la "Memoria Estratégica México-Estados Unidos", caso Tomate (disputa antidumping 1969-2026).
Reglas obligatorias:
1. Responde SOLO con la información de las fichas que se te entregan. No uses conocimiento propio para afirmar hechos.
2. Cita cada afirmación con el ID de la ficha entre corchetes, por ejemplo [ADM-0023]. Nunca inventes IDs.
3. Distingue el nivel: oficial (1), documentado por terceros (2), deducción del acervo (3), vacío. Si dos fichas chocan, muéstralo sin resolverlo.
4. Si las fichas no permiten responder, dilo claramente ("El acervo no lo documenta") y sugiere qué habría que buscar.
5. Si haces una inferencia propia, preséntala en una línea que empiece con "Deducción de esta consulta:" y cita las fichas en que se apoya.
6. Si la pregunta no trata del caso, responde que esta herramienta solo cubre el acervo del caso Tomate.
Estilo: español, tono sobrio y directo, sin guiones largos, máximo 250 palabras, párrafos cortos o viñetas.`;

const SYS_R = `Eres el red team de la "Memoria Estratégica México-Estados Unidos", caso Tomate (disputa antidumping 1969-2026). Tu tarea es atacar una posición negociadora mexicana con el acervo verificado, para que quien negocia escuche lo que preferiría no escuchar.
Dispones de la herramienta buscar_fichas. Úsala varias veces con términos distintos (cláusulas, actores, cifras, tribunales, precedentes) antes de concluir.
Estructura tu respuesta con estos encabezados:
## Supuestos que pueden fallar
## Evidencia en contra
## Cómo respondería Estados Unidos
## Vulnerabilidades jurídicas
## Si la hipótesis principal es falsa
## Lo que la posición resiste
## Preguntas que el acervo no responde
Reglas: cada punto cita las fichas entre corchetes, por ejemplo [JUR-0011]; nunca inventes IDs. Si un punto es inferencia tuya, márcalo con "Deducción:". No resuelvas contradicciones, muéstralas. Si el texto no es una posición sobre el caso, dilo y no continúes. Español sobrio, sin guiones largos, máximo 450 palabras.`;

const TOOLS = [{
  name: "buscar_fichas",
  description: "Busca fichas verificadas del acervo del caso Tomate por palabras clave en español. Devuelve hasta 12 fichas con ID, nivel, afirmación y fuente.",
  input_schema: { type: "object", properties: { consulta: { type: "string", description: "Palabras clave, por ejemplo: cláusula retiro Commerce 2013" } }, required: ["consulta"] }
}];

async function anthropic(body) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || ("Error " + r.status)); e.status = r.status; throw e; }
  return j;
}

// límites en memoria (se reinician cuando Vercel recicla la instancia)
const hits = new Map(); let day = "", dayCount = 0;
function allow(ip) {
  const now = Date.now(), today = new Date().toISOString().slice(0, 10);
  if (today !== day) { day = today; dayCount = 0; }
  if (dayCount >= DAILY_CAP) return "Se alcanzó el límite diario de consultas. Intenta mañana.";
  const arr = (hits.get(ip) || []).filter(t => now - t < 3600e3);
  if (arr.length >= PER_IP_PER_HOUR) return "Alcanzaste el límite de consultas por hora. Intenta más tarde.";
  arr.push(now); hits.set(ip, arr); dayCount++;
  return null;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const configured = !!process.env.ANTHROPIC_API_KEY;
  if (req.method === "GET") return res.status(200).json({ configured });
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });
  if (!configured) return res.status(503).json({ error: "El servicio de consulta no está activado en este sitio." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const mode = body && body.mode, text = String((body && body.text) || "").trim();
  if (!["consulta", "redteam"].includes(mode)) return res.status(400).json({ error: "Modo no válido." });
  if (!text) return res.status(400).json({ error: "Escribe una pregunta o una posición." });
  if (text.length > MAX_INPUT) return res.status(400).json({ error: `El texto excede ${MAX_INPUT} caracteres.` });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "anon";
  const block = allow(ip);
  if (block) return res.status(429).json({ error: block });

  try {
    if (mode === "consulta") {
      const used = search(text, 30);
      const j = await anthropic({ model: MODEL, max_tokens: 1200, system: SYS_Q,
        messages: [{ role: "user", content: `Pregunta: ${text}\n\nFichas relevantes del acervo (${used.length}):\n\n${used.map(compact).join("\n\n")}` }] });
      const out = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      return res.status(200).json({ text: out, used: used.map(f => f.id) });
    }
    // red team con herramienta de búsqueda ejecutada aquí
    const used = new Map(); const seed = search(text, 10); seed.forEach(f => used.set(f.id, 1));
    const msgs = [{ role: "user", content: `Posición a atacar: "${text}"\n\nFichas iniciales relacionadas:\n\n${seed.map(compact).join("\n\n")}\n\nBusca más con buscar_fichas antes de responder.` }];
    for (let i = 0; i < 6; i++) {
      const j = await anthropic({ model: MODEL, max_tokens: 2200, system: SYS_R, tools: TOOLS, messages: msgs });
      if (j.stop_reason !== "tool_use") {
        const out = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
        return res.status(200).json({ text: out, used: [...used.keys()] });
      }
      msgs.push({ role: "assistant", content: j.content });
      msgs.push({ role: "user", content: j.content.filter(b => b.type === "tool_use").map(b => {
        const r = search((b.input && b.input.consulta) || "", 12); r.forEach(f => used.set(f.id, 1));
        return { type: "tool_result", tool_use_id: b.id, content: r.length ? r.map(compact).join("\n\n") : "Sin resultados para esa búsqueda." };
      }) });
    }
    return res.status(500).json({ error: "El agente no terminó en el número de pasos permitido." });
  } catch (e) {
    return res.status(e.status === 429 ? 429 : 502).json({ error: e.status === 429 ? "El servicio está saturado. Intenta en un momento." : "No se pudo completar la consulta." });
  }
};
