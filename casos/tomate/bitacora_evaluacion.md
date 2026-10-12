# Bitácora de evaluación, caso Tomate

Recolección: 7 especialistas en Claude Sonnet 5.5 (Jurídico, Administrativo, Fiscal, Internacionalista, Historiador, Periodista, Economista). Evaluación: Claude Opus 5.5, tres evaluadores en la ronda 1 y uno en la ronda 2, ninguno vio la recolección. Fecha: 11-10-2026.

## Totales

- Fichas recolectadas: 279
- Ronda 1: Counter({'APRUEBA': 203, 'DEVUELVE': 72, 'RECHAZA': 4})
- Ronda 2 (corrección única de devueltas): Counter({'APRUEBA': 55, 'RECHAZA': 14}); retiradas por su autor: 3
- Final: Counter({'APRUEBA': 255, 'RECHAZA': 21, 'RETIRADA': 3})
- Aprobadas por nivel: Counter({'1': 107, '2': 97, 'VACIO': 27, '3': 24})

## Por agente

| Agente | R1 aprueba | R1 devuelve | R1 rechaza | R2 aprueba | R2 rechaza | Final aprobadas |
|---|---|---|---|---|---|---|
| Administrativo | 34 | 6 | 0 | 5 | 1 | 38 |
| Economista | 21 | 19 | 0 | 12 | 5 | 33 |
| Fiscal | 36 | 4 | 0 | 3 | 1 | 39 |
| Historiador | 33 | 7 | 0 | 7 | 0 | 39 |
| Internacionalista | 24 | 13 | 3 | 11 | 2 | 35 |
| Jurídico | 34 | 6 | 0 | 4 | 2 | 38 |
| Periodista | 21 | 17 | 1 | 13 | 3 | 33 |

## Motivos

- Ronda 1 (no aprobadas): {'D2': 4, 'D6': 12, 'D4': 18, 'D5': 18, 'D3': 16, 'D1': 4, 'R4': 4}
- Ronda 2 (rechazadas): {'D5': 6, 'R4': 5, 'D4': 3}

## Decisiones del orquestador

- Regla de nivel unificada tras la ronda 1: resoluciones y votaciones de la USITC nivel 1, sus informes nivel 2; cartas de legisladores nivel 2; resoluciones de pleno legislativo nivel 1; comunicado oficial conocido solo por prensa nivel 2.
- Reclasificadas tras la ronda 2: JUR-0024 (1→2), HIS-0016 (1→2).
- Acotadas para quitar comparaciones entre fuentes (que serían nivel 3): JUR-0027, JUR-0028, PER-0019. La comparación queda como contradicción registrada.
- Deduplicación (R4 del orquestador): ADM-0031 (→JUR-0027), PER-0012 (→ADM-0030), HIS-0026 (→JUR-0025). Referencias redirigidas a la ficha conservada.
- Correcciones de forma: ECO-0005 (nota de sesgo inexacta), INT-0024 e INT-0026 (campo fuente).

## Problemas sistemáticos detectados por el evaluador

1. Nivel inconsistente para la misma fuente entre agentes (USITC, cartas de legisladores, comunicados vía prensa). Resuelto con la regla unificada; debe entrar a la metodología v0.2.
2. Deducciones de nivel 3 que usan hechos no incluidos en sus premisas. Fue la principal causa de rechazo final.
3. Afirmaciones que dicen algo más que la fuente, sobre todo al atribuir frases o motivos.
4. Fuentes fuera de lista blanca con nota de sesgo pero sin justificar su fiabilidad (Periodista).
5. Duplicados entre agentes: conviene deduplicar antes de evaluar.
6. Ninguna fuente inventada ni fragmento fabricado en 279 fichas.