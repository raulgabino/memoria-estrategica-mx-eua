# Memoria Estratégica México-Estados Unidos
## Metodología de extracción de datos con agentes (v0.2, 11-10-2026)

Autor del planteamiento: Raúl Gabino Quilantán (OLEUM Consultoría).
Origen de la idea: columna "La nueva asimetría", Javier Treviño, SDP Noticias, 10-10-2026, sección "La memoria que perdemos".

---

## 1. Propósito

Construir una memoria estratégica digital de la relación México-Estados Unidos que responda preguntas de negociación con fuentes verificables, distinga con claridad lo oficial, lo documentado por terceros y lo deducido, señale contradicciones y reconozca lo que no sabe.

Esta fase es **solo de extracción de datos**: reunir, verificar y clasificar información. La interfaz viene después.

## 2. Metas y objetivos (interpretación del planteamiento)

**Meta general.** Demostrar, con un piloto acotado, que la memoria institucional de la relación bilateral puede reconstruirse a partir de fuentes y quedar al servicio de quien negocia, sin depender de la memoria personal de los funcionarios.

**Objetivos específicos**
1. Obtener un corpus inicial de afirmaciones verificadas sobre un eje estratégico, cada una con su fuente localizable.
2. Clasificar cada afirmación en uno de tres niveles de conocimiento, con etiqueta visible.
3. Cubrir el eje desde siete miradas disciplinarias para no quedar atrapados en un solo punto de vista.
4. Que nada entre al corpus sin pasar por autoverificación del agente y por un evaluador independiente que explique, de forma concreta, por qué pasa o no pasa.
5. Mantener el sistema entendible: pocas reglas, motivos codificados, fichas legibles por una persona.
6. Registrar los vacíos y las contradicciones como resultados, no como fallas.
7. Dejar un método replicable para extender el piloto a otros ejes (T-MEC, energía, migración, seguridad, agua).

**Objetivos implícitos que leo en tu planteamiento**
- Producir un activo demostrable ante gobierno, academia o la propia Cancillería (prueba de concepto, no producto final).
- Probar la soberanía epistémica que menciona el artículo: que las conclusiones sean auditables y no dependan de la autoridad de la máquina.
- Usar el piloto como base de una posible oferta de servicios de inteligencia institucional.

## 3. Alcance del piloto

**Eje propuesto (pendiente de confirmar):** controversias agrícolas y agroalimentarias México-EE. UU., 1994-2026. Casos núcleo:
- Tomate: acuerdos de suspensión antidumping (1996, 2002, 2008, 2013, 2019) y su terminación.
- Atún y etiquetado dolphin-safe (OMC).
- Azúcar y JMAF: controversia del TLCAN, acuerdos de suspensión 2014 y 2017.
- Maíz transgénico: decretos mexicanos y panel del T-MEC (2023-2024).
- Otros que surjan en la recolección (aguacate, ganado, gusano barrenador, frijol, jitomate de invernadero), solo si tienen fuentes.

**Alternativa:** revisión del T-MEC 2026 (más actual, más volátil, más fuentes de nivel 3).

**Idiomas:** español e inglés. Las afirmaciones se registran en español; la cita textual se conserva en el idioma original.

## 4. Niveles de conocimiento

El nivel se asigna **a cada afirmación, no a cada documento**.

| Nivel | Etiqueta | Qué es | Regla mínima |
|---|---|---|---|
| 1 | OFICIAL | Lo que un Estado firmó, publicó o resolvió: tratados, DOF, Federal Register, informes de paneles, resoluciones de la OMC, comunicados de SE, SRE, SADER, USTR, USDA, Commerce, FRUS. | Fuente primaria localizable con URL o referencia y fragmento textual breve. "Oficial" significa "dicho por el Estado", no "verdadero". |
| 2 | DOCUMENTADO | Terceros fiables: academia arbitrada, Congressional Research Service, USITC, think tanks con metodología explícita, prensa con fuentes identificables, memorias y entrevistas de negociadores. | Fuente identificable, autor o institución, fecha, y nota de sesgo conocido. |
| 3 | DEDUCCIÓN | Inferencia construida por un agente a partir de afirmaciones de nivel 1 y 2. | Lista de premisas con sus IDs, grado de confianza (alta, media, baja), qué evidencia la refutaría y fecha. Nunca asciende de nivel por repetición; solo con fuente nueva. |

**Piezas adicionales**
- **VACÍO:** pregunta relevante que el acervo no puede responder ("no hay registro público de la contraoferta mexicana de 2019"). Se registra con la búsqueda realizada.
- **CONTRADICCIÓN:** dos o más afirmaciones que chocan, de igual o distinto nivel. Se registran lado a lado, sin resolverlas.

**Reglas de lista de fuentes de nivel 2:** se usa una lista blanca inicial (CRS, USITC, COLMEX, CIDE, ITAM, UNAM-IIJ, Peterson Institute, Wilson Center-Mexico Institute, CSIS, El Financiero, Reforma, El Universal, Proceso, Animal Político, Reuters, AP, Bloomberg, WSJ, NYT, Politico, Inside US Trade). Una fuente fuera de la lista puede usarse si el agente justifica su fiabilidad, y el evaluador decide.

## 5. Equipo de agentes

Todos los agentes de trabajo corren en **Claude Sonnet 5.5**. El evaluador también puede correr en Sonnet; si se quiere más rigor en la evaluación, puede subirse a Opus.

| Agente | Mirada | Qué busca en cada caso |
|---|---|---|
| **Orquestador** | Coordinación | Reparte casos y preguntas, evita duplicados, consolida el corpus, mantiene los registros de vacíos y contradicciones. No aprueba fichas. |
| **Jurídico** | Derecho internacional económico y comercial | Textos de tratados, capítulos aplicables, argumentos jurídicos de cada parte, qué argumentos prosperaron ante paneles o la OMC y por qué. |
| **Administrativo** | Derecho administrativo e institucional | Qué dependencias actuaron, procedimientos (investigaciones antidumping, consultas, decretos), plazos, quién firmó, cambios de titulares. |
| **Fiscal** | Aranceles, cuotas compensatorias, aduanas, impuestos | Montos, márgenes de dumping, cuotas, precios de referencia, efectos arancelarios, recaudación. (Se interpreta "fiscal" como tributario y aduanero; confirmar.) |
| **Internacionalista** | Relaciones internacionales y política de EE. UU. | Actores estadounidenses (Congreso, estados, gremios, cabilderos), intereses reales, vínculos con otros temas de la agenda (migración, seguridad, energía). |
| **Historiador** | Contexto y continuidad | Antecedentes, secuencia de hechos, cómo se resolvieron episodios semejantes, qué consecuencias no se anticiparon. Usa FRUS y el Acervo Histórico Diplomático. |
| **Periodista** | Contraste de versiones | Cómo se contó cada episodio en México y en EE. UU., quién filtró qué, testimonios de negociadores, diferencias entre narrativa oficial y lo reportado. |
| **Economista** (propuesto) | Datos cuantitativos | Series de comercio por fracción (INEGI, Census, USITC DataWeb), empleo y producción afectados, estados y distritos expuestos. |
| **Evaluador** | Control de calidad independiente | Decide qué pasa y qué no pasa, con motivo codificado. No participa en la recolección. |

Perfil opcional para una segunda fase: **Red team** (abogado del diablo) que ataca las deducciones de nivel 3 antes de que el evaluador las acepte.

## 6. Flujo de trabajo

1. **Planificación (orquestador).** Para cada caso, define 5 a 10 preguntas guía, tomadas del modelo de Treviño:
   - ¿Qué exigió Estados Unidos y cuándo?
   - ¿Qué sectores estadounidenses apoyaron y cuáles se opusieron?
   - ¿Qué argumentos jurídicos usó cada parte y cuáles resultaron eficaces?
   - ¿Qué concesiones ofreció México?
   - ¿Cómo se resolvió y quién lo firmó?
   - ¿Qué consecuencias no se anticiparon?
   - ¿Qué lecciones quedaron documentadas, y cuáles no?
2. **Recolección (especialistas).** Cada especialista trabaja las preguntas desde su mirada y produce fichas (sección 7). Búsqueda amplia: mínimo dos fuentes independientes para cada hecho central cuando existan.
3. **Autoverificación (cada especialista, antes de entregar).** Lista de control obligatoria:
   - ¿Abrí la fuente y el fragmento citado aparece en ella?
   - ¿La fecha, la cifra y el nombre coinciden con la fuente?
   - ¿El nivel asignado corresponde a la fuente y no al documento completo?
   - Si es nivel 3, ¿cada premisa tiene ID y existe?
   - ¿Dejé registrado lo que busqué y no encontré?
4. **Evaluación (evaluador).** Revisa cada ficha y emite dictamen (sección 8).
5. **Consolidación (orquestador).** Integra fichas aprobadas, deduplica, actualiza registros de vacíos y contradicciones, y produce el informe del caso.

## 7. Ficha de afirmación

Cada hallazgo es una ficha con estos campos (JSON o una fila de CSV):

```
id:               AGR-TOM-0001
caso:             Tomate
agente:           Jurídico
afirmacion:       Enunciado breve en español, una sola idea.
nivel:            1 | 2 | 3
tipo:             hecho | argumento | posición | cifra | consecuencia | vacío
fuente:           Título, institución o autor, fecha
url_o_referencia: Enlace o referencia de archivo
fragmento:        Cita textual breve (máximo 15 palabras), idioma original
premisas:         [IDs]  (solo nivel 3)
confianza:        alta | media | baja  (solo nivel 3)
refutable_si:     Qué evidencia la tumbaría  (solo nivel 3)
sesgo_fuente:     Nota breve (solo nivel 2)
contradice_a:     [IDs]  (si aplica)
fecha_hecho:      AAAA-MM-DD o rango
fecha_registro:   AAAA-MM-DD
autoverificado:   sí
dictamen:         (lo llena el evaluador)
motivo:           (lo llena el evaluador)
```

## 8. Reglas del evaluador

El evaluador emite uno de tres dictámenes, siempre con un **código de motivo** y una frase concreta.

**APRUEBA** cuando la ficha cumple todo:
- A1 Fuente localizable y fragmento verificado.
- A2 Nivel correctamente asignado.
- A3 Afirmación fiel a la fuente, sin ampliarla.
- A4 Para nivel 3: premisas existentes y aprobadas, confianza justificada.

**DEVUELVE** (corregible) por:
- D1 Fragmento no encontrado o sin URL.
- D2 Cifra, fecha o nombre no coincide con la fuente.
- D3 Nivel mal asignado (por ejemplo, interpretación de un periodista registrada como nivel 1).
- D4 Afirmación que dice más que la fuente.
- D5 Nivel 3 con premisa faltante o no aprobada.
- D6 Fuente de nivel 2 fuera de lista blanca sin justificación.

**RECHAZA** (no entra) por:
- R1 Fuente inexistente o inventada.
- R2 Afirmación sin relación con el caso.
- R3 Deducción sin premisas o circular.
- R4 Duplicado exacto de una ficha aprobada.

Formato del dictamen: `DEVUELVE · D2 · La fuente dice 17% de cuota compensatoria, la ficha dice 7%.`

Una ficha devuelta puede corregirse una vez; si vuelve a fallar, se rechaza. Las contradicciones nunca son motivo de rechazo: se registran.

## 9. Reglas generales para todos los agentes

- No inventar. Si no hay fuente, se registra un VACÍO.
- Citar fragmentos breves; no copiar párrafos completos de fuentes con derechos de autor.
- Una ficha, una idea.
- Preferir fuente primaria sobre secundaria cuando ambas existen.
- Registrar la búsqueda fallida tanto como la exitosa.
- Señalar, sin resolver, cualquier contradicción.

## 10. Entregables de la fase de extracción

1. `fichas_aprobadas.csv` (o JSON) con el corpus.
2. `fichas_rechazadas.csv` con dictamen y motivo (sirve para auditar al evaluador).
3. `vacios.md` con preguntas sin respuesta y búsquedas realizadas.
4. `contradicciones.md` con pares o grupos de fichas en conflicto.
5. `informe_caso_<nombre>.md`: línea de tiempo, actores, argumentos eficaces, concesiones, consecuencias no anticipadas, lecciones, cada punto con sus IDs.
6. `bitacora_evaluacion.md`: conteo de aprobadas, devueltas y rechazadas por agente y motivo.

## 11. Decisiones pendientes

1. Confirmar el eje del piloto: controversias agrícolas o revisión del T-MEC.
2. Confirmar el sentido de "fiscal": tributario y aduanero (supuesto actual) o ministerio público.
3. Aceptar o no al economista y, más adelante, al red team.
4. Modelo del evaluador: Sonnet 5.5 (igual que los demás) u Opus.
5. Volumen objetivo del piloto (propuesta: 4 casos, 150 a 300 fichas aprobadas).
6. Dónde viven los datos: carpeta local en el Mac, Google Drive o este proyecto de Claude.
7. Validar o ajustar la lista blanca de fuentes de nivel 2.
8. Quién resuelve desacuerdos con el evaluador: Raúl, como revisor final.

## 12. Instrucción de arranque para otra conversación

> Lee el documento "metodologia-memoria-estrategica-mx-eua.md" de este proyecto y ejecútalo. Actúa como orquestador. Lanza subagentes en Sonnet 5.5 con los perfiles de la sección 5, uno por especialidad, sobre el caso [CASO]. Cada subagente entrega fichas según la sección 7 tras su autoverificación. Después lanza un evaluador independiente que aplique la sección 8 sin haber visto la recolección. Consolida según la sección 10 y entrégame los archivos. No inventes fuentes; registra los vacíos.

## 13. Decisiones tomadas y reglas añadidas (v0.2, tras el caso Tomate)

**Decisiones:** eje piloto = controversias agroalimentarias; "fiscal" = aranceles, cuotas y aduanas; se incorpora el Economista; especialistas en Sonnet 5.5 y evaluador en Opus 5.5; datos en este proyecto de Claude (después se pasarán al Mac).

**Reglas de nivel unificadas** (prevalecen sobre la sección 4):
- Resoluciones y votaciones de la USITC: nivel 1. Sus informes y compilaciones de datos: nivel 2.
- Cartas de legisladores: nivel 2. Resoluciones aprobadas por un pleno legislativo: nivel 1.
- Comunicado oficial conocido solo por reproducción en prensa: nivel 2.
- Cálculos o comparaciones entre fuentes: nivel 3, nunca dentro de una ficha de nivel 1 o 2.
- Las premisas de nivel 3 deben contener todos los hechos que usa la deducción.
- Fuente fuera de lista blanca: sesgo_fuente debe justificar su fiabilidad, no solo describir sus debilidades.

**Ajustes de proceso:**
- El orquestador deduplica entre agentes antes de enviar a evaluación.
- Cada agente usa su propio directorio de trabajo (en el caso Tomate el directorio compartido provocó sobrescrituras).
- Ronda 2: el evaluador solo aprueba o rechaza.
