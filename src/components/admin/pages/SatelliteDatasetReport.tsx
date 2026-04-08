import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Satellite, Code2, ChevronDown, ChevronUp, CheckCircle2,
  AlertTriangle, Star, Globe2, Clock, Layers, Zap, BookOpen,
  ArrowRight, Database, CloudOff, DollarSign, Info
} from 'lucide-react';

// ─── Data ───────────────────────────────────────────────────────────────────

const datasets = [
  {
    name: 'Sentinel-2',
    agency: 'ESA / Copernicus',
    spatialRes: '10 m',
    revisit: '~5 days',
    redBand: 'B4 (665 nm)',
    nirBand: 'B8 (842 nm)',
    cloudHandling: 'QA60 / Sen2Cor',
    cost: 'Free',
    mangrove: 'Excellent',
    score: 95,
    color: '#10b981',
    badge: 'Top Pick',
    geeId: 'COPERNICUS/S2_SR',
    note: 'Ideal for fine-scale NDVI; patchy mangrove detection.'
  },
  {
    name: 'Landsat 8/9',
    agency: 'USGS / NASA',
    spatialRes: '30 m',
    revisit: '~8 days',
    redBand: 'B4 (655 nm)',
    nirBand: 'B5 (865 nm)',
    cloudHandling: 'QA_PIXEL (Fmask)',
    cost: 'Free',
    mangrove: 'Good',
    score: 78,
    color: '#3b82f6',
    badge: 'Long-term',
    geeId: 'LANDSAT/LC09/C02/T1_L2',
    note: 'Best for multi-year trend analysis since 1972.'
  },
  {
    name: 'MODIS',
    agency: 'NASA',
    spatialRes: '250 m',
    revisit: 'Daily',
    redBand: 'B1 (645–667 nm)',
    nirBand: 'B2 (841–876 nm)',
    cloudHandling: 'QA + Max-NDVI composite',
    cost: 'Free',
    mangrove: 'Regional',
    score: 55,
    color: '#f59e0b',
    badge: 'Large-area',
    geeId: 'MODIS/061/MOD13Q1',
    note: 'Coarse-scale trends; best for wide mangrove belts.'
  },
  {
    name: 'PlanetScope',
    agency: 'Planet Labs',
    spatialRes: '~3 m',
    revisit: 'Daily',
    redBand: 'Red (~649 nm)',
    nirBand: 'NIR (~857 nm)',
    cloudHandling: 'Multiple passes / CloudCover',
    cost: 'Commercial',
    mangrove: 'Ultra-fine',
    score: 90,
    color: '#8b5cf6',
    badge: 'Premium',
    geeId: 'n/a (API)',
    note: 'Best spatial detail; requires a license.'
  },
  {
    name: 'NAIP',
    agency: 'USDA',
    spatialRes: '~1 m',
    revisit: 'Annual',
    redBand: 'Red (~645–670 nm)',
    nirBand: 'NIR (~780–860 nm)',
    cloudHandling: 'Low (summer flights)',
    cost: 'Free (US only)',
    mangrove: 'USA only',
    score: 70,
    color: '#ef4444',
    badge: 'USA only',
    geeId: 'USDA/NAIP/DOQQ',
    note: 'Very high detail but restricted to United States.'
  }
];

const geeSnippets = [
  {
    title: 'Compute NDVI (Sentinel-2)',
    icon: <Layers size={16} />,
    code: `var col = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(aoi)
  .filterDate('2023-01-01','2023-12-31');

function addNDVI(img) {
  return img.addBands(
    img.normalizedDifference(['B8','B4'])
       .rename('NDVI')
  );
}
var withNDVI = col.map(addNDVI);`
  },
  {
    title: 'Cloud Mask – Sentinel-2',
    icon: <CloudOff size={16} />,
    code: `function maskS2(img) {
  var qa = img.select('QA60');
  var mask = qa.bitwiseAnd(1<<10).eq(0)
    .and(qa.bitwiseAnd(1<<11).eq(0));
  return img.updateMask(mask);
}
var cloudFree = col.map(maskS2).map(addNDVI);`
  },
  {
    title: 'Cloud Mask – Landsat 8/9',
    icon: <CloudOff size={16} />,
    code: `function maskL8(img) {
  var qa = img.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(1<<3).eq(0)
    .and(qa.bitwiseAnd(1<<5).eq(0));
  return img.updateMask(mask);
}
var l8Col = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(aoi).filterDate(start, end)
  .map(maskL8).map(addNDVI);`
  },
  {
    title: 'Median Composite',
    icon: <Globe2 size={16} />,
    code: `var composite = cloudFree
  .select('NDVI')
  .median();

Map.addLayer(composite,
  {min:0, max:1, palette:['white','green']},
  'NDVI Composite');`
  },
  {
    title: 'Export GeoTIFF',
    icon: <Database size={16} />,
    code: `Export.image.toDrive({
  image: composite,
  description: 'NDVI_2023',
  folder: 'EarthEngine',
  region: aoi,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});`
  },
  {
    title: 'Time-Series CSV Export',
    icon: <Clock size={16} />,
    code: `var ts = cloudFree.map(function(img) {
  return img.select('NDVI')
    .reduceRegions({
      collection: fc,
      reducer: ee.Reducer.mean(),
      scale: 30
    }).first()
    .set('date', img.date().format());
});
Export.table.toDrive({
  collection: ts,
  description: 'NDVI_TimeSeries',
  fileFormat: 'CSV'
});`
  }
];

const pipeline = [
  { step: '01', title: 'Data Acquisition', desc: 'Query Sentinel-2 / Landsat for AOI & date range. Pre-filter by cloud %.' , icon: <Satellite size={16}/>, color: '#10b981' },
  { step: '02', title: 'Preprocessing', desc: 'Atmospheric correction (L2A/SR), geometric orthorectification, BRDF normalisation.', icon: <Layers size={16}/>, color: '#3b82f6' },
  { step: '03', title: 'Cloud Masking', desc: 'Apply QA60 / QA_PIXEL bitmask. Optional: s2cloudless for improved accuracy.', icon: <CloudOff size={16}/>, color: '#8b5cf6' },
  { step: '04', title: 'NDVI Computation', desc: '(NIR − Red) / (NIR + Red) per image. Values: −1 (water) → +1 (dense veg).', icon: <Zap size={16}/>, color: '#f59e0b' },
  { step: '05', title: 'Mosaic / Composite', desc: 'Median or maximum-NDVI composite per period. Fill gaps via interpolation.', icon: <Globe2 size={16}/>, color: '#06b6d4' },
  { step: '06', title: 'Export & Visualise', desc: 'GeoTIFF to Drive/GCS, CSV time-series, tile integration into web maps.', icon: <Database size={16}/>, color: '#ef4444' },
];

const preprocessing = [
  { label: 'Use Surface Reflectance products (L2A / SR)', done: true },
  { label: 'Apply cloud & cirrus bitmask before NDVI', done: true },
  { label: 'Orthorectification (auto in Sentinel-2 / Landsat C2)', done: true },
  { label: 'BRDF normalisation for long-term trend comparisons', done: false },
  { label: 'Temporal smoothing (Savitzky–Golay / harmonic)', done: false },
  { label: 'Resample coarse layers to study grid (bilinear)', done: false },
];

const additionalNotes = [
  { title: 'Data Gaps & Cloud Cover', content: 'Coastal tropics often have high cloud frequency. Consider fusing optical NDVI with Sentinel-1 SAR (cloud-penetrating) or using interpolation algorithms if gaps remain.' },
  { title: 'Licensing', content: 'Sentinel, Landsat, MODIS, and NAIP are free/open data (NASA/USGS/Copernicus). PlanetScope is proprietary; if budget is limited, rely on Sentinel-2 or HLS.' },
  { title: 'GEE Limits', content: 'Free for research and small-scale. For whole-country timeseries, request a quota increase or execute batch jobs on Google Cloud Storage.' },
  { title: 'Front-end Integration', content: 'Use getTileUrl for dynamic display in Leaflet or Google Maps. For static exports, serve pre-processed GeoTIFFs via Cloud Storage.' },
];

const searchSnippets = [
  {
    title: 'Search by AOI & Date',
    icon: <Globe2 size={16} />,
    code: `// Define AOI (Geometry)
var aoi = ee.Geometry.Rectangle([lon1, lat1, lon2, lat2]);

// Filter Sentinel-2 collection
var s2Col = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(aoi)
  .filterDate('2022-01-01', '2022-03-31')
  // Pre-filter clouds < 20%
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));`
  },
  {
    title: 'Interactive Map ID (Web App)',
    icon: <Layers size={16} />,
    code: `// Get Map ID for Web App integration
var image = s2Col.median().select('NDVI');
var viz = {min: 0, max: 1, palette: ['white', 'green']};
var mapIdObj = ee.Image(image).getMap(viz);

// Use in Web Map Tile Service (WMTS)
console.log(mapIdObj.mapid);
console.log(mapIdObj.token);`
  }
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const ScoreBar: React.FC<{ score: number; color: string }> = ({ score, color }) => (
  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${score}%` }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
    />
  </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-slate-950 rounded-xl p-4 text-xs text-green-300 font-mono overflow-x-auto leading-relaxed whitespace-pre">
    {code}
  </pre>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const SatelliteDatasetReport: React.FC = () => {
  const [openSnippet, setOpenSnippet] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'compare' | 'gee' | 'pipeline' | 'prep' | 'notes'>('compare');

  const tabs: { key: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { key: 'compare', label: 'Dataset Comparison', icon: <Satellite size={14}/> },
    { key: 'gee', label: 'GEE Snippets', icon: <Code2 size={14}/> },
    { key: 'pipeline', label: 'Pipeline', icon: <ArrowRight size={14}/> },
    { key: 'prep', label: 'Preprocessing', icon: <CheckCircle2 size={14}/> },
    { key: 'notes', label: 'Best Practices', icon: <Info size={14}/> },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/10 shadow-xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
          <Satellite size={120} className="text-white rotate-12" />
        </div>
        <h4 className="text-white font-bold text-lg flex items-center gap-2 mb-3">
          <Info size={18} className="text-blue-400" />
          Executive Summary
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl relative z-10">
          Selecting the right satellite datasets for NDVI analysis is crucial for CLORIT’s coastal/mangrove monitoring. 
          High-resolution data (Sentinel-2) provides detailed health maps, while coarse datasets (MODIS) cover large areas frequently. 
          This report prioritises official sources, provides GEE implementation patterns, and suggests tiling strategies to manage large data volumes 
          without exceeding Earth Engine quotas.
        </p>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-200">
            <Satellite className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Satellite Dataset Intelligence
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              NDVI source selection · GEE workflows · Mangrove suitability
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
          <BookOpen size={12} className="text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">
            Based on Copernicus · USGS · NASA docs
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === t.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Tab: Dataset Comparison ── */}
        {activeTab === 'compare' && (
          <motion.div key="compare" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
            {/* Recommendation callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 flex gap-3">
                <Star className="text-emerald-600 w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">High-Accuracy NDVI</p>
                  <p className="text-xs text-emerald-700 mt-1">Use <strong>Sentinel-2</strong> (10 m, free) for detailed mangrove patch detection. Supplement with <strong>PlanetScope</strong> (3 m) for hotspots if budget allows.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 flex gap-3">
                <Globe2 className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-blue-800">Large-Area Monitoring</p>
                  <p className="text-xs text-blue-700 mt-1">Use <strong>MODIS</strong> (daily, 250 m) for regional trends + <strong>Landsat 8/9</strong> (30 m) for long-term multi-year series and HLS composites.</p>
                </div>
              </div>
            </div>

            {/* Dataset cards */}
            <div className="grid grid-cols-1 gap-3">
              {datasets.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    {/* Left */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${d.color}18` }}>
                        <Satellite size={18} style={{ color: d.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">{d.name}</span>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${d.color}20`, color: d.color }}
                          >
                            {d.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{d.agency}</p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black" style={{ color: d.color }}>{d.score}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Score</p>
                    </div>
                  </div>

                  <ScoreBar score={d.score} color={d.color} />

                  {/* Specs grid */}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { label: 'Spatial Res', value: d.spatialRes },
                      { label: 'Revisit', value: d.revisit },
                      { label: 'Cost', value: d.cost },
                      { label: 'Mangrove', value: d.mangrove },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-50 rounded-lg p-2">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">{s.label}</p>
                        <p className="font-semibold text-slate-700 mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bands */}
                  <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded-full font-mono font-semibold">Red: {d.redBand}</span>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-100 rounded-full font-mono font-semibold">NIR: {d.nirBand}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-mono">{d.cloudHandling}</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full font-mono">GEE: {d.geeId}</span>
                  </div>

                  {/* Note */}
                  <p className="mt-2 text-xs text-slate-500 flex items-start gap-1.5">
                    <Info size={12} className="mt-0.5 shrink-0 text-slate-400" />
                    {d.note}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Summary table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h4 className="text-sm font-bold text-slate-700">Quick Comparison Table</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {['Dataset', 'Res.', 'Revisit', 'Red Band', 'NIR Band', 'Cost', 'Mangrove'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wide text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datasets.map((d, i) => (
                      <tr key={d.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="px-4 py-2.5">
                          <span className="font-bold text-slate-800">{d.name}</span>
                          <span className="ml-1.5 text-[10px] text-slate-400">{d.agency}</span>
                        </td>
                        <td className="px-4 py-2.5 font-mono font-semibold text-slate-700">{d.spatialRes}</td>
                        <td className="px-4 py-2.5 text-slate-600">{d.revisit}</td>
                        <td className="px-4 py-2.5 font-mono text-red-600">{d.redBand}</td>
                        <td className="px-4 py-2.5 font-mono text-purple-600">{d.nirBand}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${d.cost === 'Commercial' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {d.cost}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-600">{d.mangrove}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Tab: GEE Snippets ── */}
        {activeTab === 'gee' && (
          <motion.div key="gee" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-900/5 border border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <AlertTriangle size={13} className="text-amber-500 shrink-0" />
              Replace <code className="font-mono bg-slate-100 px-1 rounded text-slate-700">aoi</code>, <code className="font-mono bg-slate-100 px-1 rounded text-slate-700">start</code>, and <code className="font-mono bg-slate-100 px-1 rounded text-slate-700">end</code> with your geometry and date strings in Google Earth Engine.
            </div>

            {/* Core Calculations */}
            <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-4 mb-2">Core SDK Patterns</h5>
            {geeSnippets.map((s, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenSnippet(openSnippet === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-slate-100 rounded-lg text-slate-600">{s.icon}</span>
                    <span className="text-sm font-semibold text-slate-800">{s.title}</span>
                  </div>
                  {openSnippet === i ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>
                <AnimatePresence>
                  {openSnippet === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <CodeBlock code={s.code} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Search & Integration */}
            <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-6 mb-2">Search & Frontend Integration</h5>
            {searchSnippets.map((s, i) => (
              <div key={i + 100} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenSnippet(openSnippet === i + 100 ? null : i + 100)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-slate-100 rounded-lg text-slate-600">{s.icon}</span>
                    <span className="text-sm font-semibold text-slate-800">{s.title}</span>
                  </div>
                  {openSnippet === i + 100 ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>
                <AnimatePresence>
                  {openSnippet === i + 100 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <CodeBlock code={s.code} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {/* GEE Quota note */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 flex gap-3">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-800">
                <strong>GEE Quotas:</strong> Export tasks are limited. For large areas, tile the study region (split AOI into sub-regions), process in yearly chunks, and use <code className="font-mono bg-amber-100 px-1 rounded">Export.image.toCloudStorage</code> to a GCS bucket to avoid Drive size limits. Max concurrent tasks: ~3000. See <span className="underline font-medium">developers.google.com/earth-engine/quotas</span>.
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Tab: Pipeline ── */}
        {activeTab === 'pipeline' && (
          <motion.div key="pipeline" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-red-400 rounded-full" />
              <div className="space-y-0">
                {pipeline.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 pb-6 last:pb-0"
                  >
                    {/* Circle node */}
                    <div
                      className="relative z-10 w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-md"
                      style={{ background: `${p.color}20`, border: `2px solid ${p.color}40` }}
                    >
                      <span style={{ color: p.color }}>{p.icon}</span>
                    </div>
                    {/* Content */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex-1 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: p.color }}>Step {p.step}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm">{p.title}</h5>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Tab: Preprocessing ── */}
        {activeTab === 'prep' && (
          <motion.div key="prep" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-800">Required Preprocessing Checklist</h4>
              {preprocessing.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className={item.done ? 'text-emerald-500' : 'text-slate-300'} />
                  <span className={`text-xs ${item.done ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{item.label}</span>
                  {!item.done && (
                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">Optional</span>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <h5 className="text-sm font-bold text-slate-800 mb-2">NDVI Thresholds</h5>
                {[
                  { label: 'Dense Vegetation / Mangrove', range: '> 0.5', color: '#10b981' },
                  { label: 'Sparse / Degraded Vegetation', range: '0.3 – 0.5', color: '#f59e0b' },
                  { label: 'Bare Soil / Low Cover', range: '0.1 – 0.3', color: '#ef4444' },
                  { label: 'Water / Non-vegetated', range: '< 0.1', color: '#3b82f6' },
                ].map(t => (
                  <div key={t.label} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-slate-600">{t.label}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full" style={{ background: `${t.color}18`, color: t.color }}>{t.range}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <h5 className="text-sm font-bold text-slate-800 mb-2">Data Volume Strategy</h5>
                {[
                  { tip: 'Tile AOI into sub-regions to avoid maxPixels limit' },
                  { tip: 'Process by yearly chunks for time-series' },
                  { tip: 'Export to Google Cloud Storage (no Drive limit)' },
                  { tip: 'Downsample to 60 m for preliminary analysis' },
                  { tip: 'Use TFRecord format for ML training exports' },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 text-xs text-slate-600 border-b border-slate-50 last:border-0">
                    <ArrowRight size={11} className="text-emerald-500 mt-0.5 shrink-0" />
                    {t.tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50 flex gap-3">
              <Info size={15} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Cloud Gap Strategy:</strong> Coastal tropics have high cloud frequency. Fuse optical NDVI with <strong>Sentinel-1 SAR</strong> backscatter (cloud-penetrating) or use harmonic time-series reconstruction (TIMESAT / ee.Algorithms) to fill persistent cloud gaps in mangrove monitoring regions.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Tab: Additional Notes ── */}
        {activeTab === 'notes' && (
          <motion.div key="notes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalNotes.map((note, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-blue-100 transition-colors">
                  <h5 className="text-sm font-bold text-slate-900 mb-2">{note.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl text-white shadow-xl">
              <h5 className="font-bold text-lg mb-2">Final Recommendation</h5>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                For the CLORIT project, we recommend a hybridized approach: use Sentinel-2 (L2A) as the primary imagery source for high-resolution project verification, 
                and Landsat 8/9 for multi-decade baseline establishment. All data should be processed via Surface Reflectance workflows to ensure cryptographic 
                consistency across the Registry Protocol.
              </p>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">Copernicus Sentinel-2</div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">USGS Landsat 9</div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default SatelliteDatasetReport;
