# Memoria Estratégica México-Estados Unidos

Acervo verificado de la relación bilateral, organizado por niveles de conocimiento: **oficial**, **documentado por terceros**, **deducción** y **vacío**. Piloto: controversias agroalimentarias, caso 1, tomate fresco (1969-2026).

- Sitio: `index.html` (GitHub Pages). Nota de decisión, cronología, actores, explorador de fichas, consulta citada y red team.
- Datos: `data/fichas.json` (255 fichas aprobadas) y `data/novedades.json` (seguimiento semanal).
- Caso Tomate: `casos/tomate/` (informe, fichas aprobadas y rechazadas, vacíos, contradicciones, bitácora de evaluación).
- Método: `metodologia.md`.

## Consulta y red team

Pasan por una función de servidor (`api/claude.js`) que guarda la llave de la API de Claude en la variable de entorno `ANTHROPIC_API_KEY` de Vercel; la llave nunca llega al navegador. El servidor fija las instrucciones, el modelo y la búsqueda en el acervo, y aplica topes por visitante y por día. Si el servicio no está activado, el sitio muestra respuestas de ejemplo (`data/ejemplos.json`) y ofrece, como opción avanzada, usar una llave propia guardada solo en el navegador.

## Cómo se construyó

Siete agentes especialistas (Claude Sonnet 5.5) recolectaron afirmaciones con fuente pública y fragmento textual. Un evaluador independiente (Claude Opus 5.5) abrió cada fuente y dictaminó en dos rondas. 279 fichas recolectadas, 255 aprobadas.

Inspirado en "La nueva asimetría", Javier Treviño (SDP Noticias, 10-oct-2026), y en *A Conceptual Framework for AI-Augmented Statecraft*, Charlie Pozniak (Belfer Center, 2026). Autor: Raúl Gabino Quilantán (proyecto personal). Contacto: raulgabino@gmail.com.

Fuentes públicas. Las citas son fragmentos breves de sus fuentes originales.
