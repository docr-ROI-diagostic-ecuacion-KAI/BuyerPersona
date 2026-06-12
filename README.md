# Conexión Buyer Persona · Del perfil al JSON accionable

Aplicación Doc ROI para construir un Buyer Persona estratégico, diagnosticar su madurez relacional y generar entregables accionables: ficha visual, JSON, keywords, topic clusters, KPIs, receta ejecutiva y PDF.

## Ejecución

```bash
npm install
npm run dev
```

## Evolución futura

La app funciona sin backend y guarda el avance en `localStorage`. La arquitectura deja preparados puntos de integración con OpenAI, Gemini, Claude, n8n, Google Sheets, Notion, CRM, KAIloop o neXus Kukulcán desde `src/lib/recommendations.ts` y `src/lib/exports.ts`.
