// Mide con Lighthouse (móvil, throttling por defecto) sobre el build de producción.
// Uso: npm run build && npm run preview  (otra terminal)  y luego  node scripts/lighthouse.mjs http://127.0.0.1:4323/
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://127.0.0.1:4323/').replace(/\/?$/, '/');
const RUNS = 3;
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const paginas = [
  ['inicio', ''],
  ['listado', 'ofertas/'],
  ['listado-filtrado', 'ofertas/?cat=gastronomia&zona=Costa'],
  ['detalle', 'ofertas/casa-tilo/'],
];
const mediana = (arr) => [...arr].sort((a, b) => a - b)[Math.floor(arr.length / 2)];

const resultados = {};
for (const [id, ruta] of paginas) {
  const corridas = [];
  for (let i = 0; i < RUNS; i++) {
    const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox'] });
    try {
      const { lhr } = await lighthouse(base + ruta, { port: chrome.port, output: 'json', logLevel: 'error' });
      const a = lhr.audits;
      corridas.push({
        rendimiento: Math.round(lhr.categories.performance.score * 100),
        accesibilidad: Math.round(lhr.categories.accessibility.score * 100),
        buenasPracticas: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        fcp: Math.round(a['first-contentful-paint'].numericValue),
        lcp: Math.round(a['largest-contentful-paint'].numericValue),
        tbt: Math.round(a['total-blocking-time'].numericValue),
        cls: +a['cumulative-layout-shift'].numericValue.toFixed(3),
      });
    } finally {
      await chrome.kill();
    }
  }
  const r = {};
  for (const k of Object.keys(corridas[0])) r[k] = mediana(corridas.map((c) => c[k]));
  resultados[id] = r;
  console.log(id, JSON.stringify(r));
}
fs.mkdirSync('lighthouse', { recursive: true });
fs.writeFileSync('lighthouse/resultados.json', JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), corridas: RUNS, perfil: 'móvil (por defecto de Lighthouse)', resultados }, null, 2));
