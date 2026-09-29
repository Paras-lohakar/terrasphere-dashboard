import React from 'react';
import { ChangeDetectionItem } from '../types/intelligence';
import { ChevronRight } from 'lucide-react';

interface MetricsTrayProps {
  item: ChangeDetectionItem;
  onSelectRelated: (id: string) => void;
}

export const MetricsTray: React.FC<MetricsTrayProps> = ({ item, onSelectRelated }) => {
  const bands = item.spectralSignature.bands;
  const beforeVals = item.spectralSignature.beforeValues;
  const afterVals = item.spectralSignature.afterValues;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 text-slate-200">
      {/* 1. Time Series Analysis (4 cols) */}
      <div className="xl:col-span-4 bg-[#090e18] border border-slate-800 rounded-lg p-3 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-200">Time Series Analysis</h4>
          <span className="text-[10px] font-mono text-cyan-400">NDBI / Built Trend</span>
        </div>

        {/* SVG Sparkline Graph */}
        <div className="relative h-16 w-full my-1">
          <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible">
            {/* Horizontal gridlines */}
            <line x1="0" y1="15" x2="300" y2="15" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1="35" x2="300" y2="35" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1="55" x2="300" y2="55" stroke="#1e293b" />

            {/* Area fill */}
            <path
              d="M 10 52 L 55 50 L 105 48 L 155 42 L 205 28 L 255 12 L 290 8 L 290 55 L 10 55 Z"
              fill="rgba(56, 189, 248, 0.15)"
            />

            {/* Trend line */}
            <polyline
              points="10,52 55,50 105,48 155,42 205,28 255,12 290,8"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />

            {/* Nodes */}
            <circle cx="10" cy="52" r="3" fill="#38bdf8" />
            <circle cx="55" cy="50" r="3" fill="#38bdf8" />
            <circle cx="105" cy="48" r="3" fill="#38bdf8" />
            <circle cx="155" cy="42" r="3" fill="#38bdf8" />
            <circle cx="205" cy="28" r="3" fill="#ef4444" />
            <circle cx="255" cy="12" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
            <circle cx="290" cy="8" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
          </svg>
        </div>

        {/* Thumbnail & Date Strip */}
        <div className="grid grid-cols-7 gap-1 pt-1 border-t border-slate-800">
          {item.temporalSnapshots.map((snap) => (
            <div key={snap.period} className="flex flex-col items-center">
              <div className="w-full h-6 rounded overflow-hidden bg-black border border-slate-700/60 mb-0.5">
                <img src={snap.image} alt={snap.label} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-[8px] font-mono ${
                  snap.hasChange ? 'text-red-400 font-bold' : 'text-slate-400'
                }`}
              >
                {snap.label.slice(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Change Area Trend (2 cols) */}
      <div className="xl:col-span-2 bg-[#090e18] border border-slate-800 rounded-lg p-3 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-xs font-bold text-slate-200">Change Area Trend</h4>
          <span className="text-[10px] font-bold text-purple-400">+2.4 ha</span>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-around h-24 pt-2 pb-1 border-b border-slate-800">
          {/* 2023 */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono text-slate-500">0 ha</span>
            <div className="w-6 bg-slate-800 rounded-t h-1" />
            <span className="text-[9px] font-mono text-slate-400">2023</span>
          </div>

          {/* 2024 */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono text-slate-400">0.8</span>
            <div className="w-6 bg-purple-700/70 rounded-t h-8" />
            <span className="text-[9px] font-mono text-slate-400">2024</span>
          </div>

          {/* 2025 */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono font-bold text-fuchsia-300">2.4</span>
            <div className="w-6 bg-gradient-to-t from-purple-600 to-fuchsia-400 rounded-t h-20 shadow-[0_0_10px_rgba(217,70,239,0.3)]" />
            <span className="text-[9px] font-mono font-bold text-fuchsia-400">2025</span>
          </div>
        </div>

        <div className="text-[9px] text-slate-400 text-center pt-1 font-mono">
          Growth Rate: +200% YoY
        </div>
      </div>

      {/* 3. Spectral Signature (Sentinel-2) (3 cols) */}
      <div className="xl:col-span-3 bg-[#090e18] border border-slate-800 rounded-lg p-3 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-xs font-bold text-slate-200">Spectral Signature (Sentinel-2)</h4>
          <div className="flex items-center gap-2 text-[9px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Before (2023)
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              After (2025)
            </span>
          </div>
        </div>

        {/* Reflectance Chart */}
        <div className="relative h-24 w-full">
          <svg viewBox="0 0 240 80" className="w-full h-full overflow-visible">
            {/* y-axis labels */}
            <text x="0" y="10" fill="#64748b" fontSize="7" fontFamily="monospace">0.6</text>
            <text x="0" y="45" fill="#64748b" fontSize="7" fontFamily="monospace">0.3</text>
            <text x="0" y="78" fill="#64748b" fontSize="7" fontFamily="monospace">0</text>

            <line x1="18" y1="8" x2="240" y2="8" stroke="#1e293b" />
            <line x1="18" y1="42" x2="240" y2="42" stroke="#1e293b" strokeDasharray="2 2" />
            <line x1="18" y1="76" x2="240" y2="76" stroke="#1e293b" />

            {/* Before Curve (Green) */}
            <polyline
              points={beforeVals
                .map((v, i) => `${22 + i * 20},${76 - v * 100}`)
                .join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
            />
            {beforeVals.map((v, i) => (
              <circle
                key={`b-${i}`}
                cx={22 + i * 20}
                cy={76 - v * 100}
                r="2"
                fill="#10b981"
              />
            ))}

            {/* After Curve (Red) */}
            <polyline
              points={afterVals
                .map((v, i) => `${22 + i * 20},${76 - v * 100}`)
                .join(' ')}
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.8"
            />
            {afterVals.map((v, i) => (
              <circle
                key={`a-${i}`}
                cx={22 + i * 20}
                cy={76 - v * 100}
                r="2"
                fill="#ef4444"
              />
            ))}
          </svg>
        </div>

        {/* Band labels along x-axis */}
        <div className="flex justify-between pl-4 pr-1 text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-800">
          {bands.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>

      {/* 4. Related Results (3 cols) */}
      <div className="xl:col-span-3 bg-[#090e18] border border-slate-800 rounded-lg p-3 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-200">Related Results</h4>
          <button className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center">
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Carousel / Cards */}
        <div className="grid grid-cols-3 gap-2">
          {item.relatedDetections.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectRelated(rel.id)}
              className="group cursor-pointer rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500 p-1.5 transition flex flex-col justify-between"
            >
              <div className="w-full h-12 rounded overflow-hidden bg-black mb-1">
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-200 truncate">{rel.title}</p>
                <span className="text-[8px] font-mono text-slate-400">{rel.distance}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-[9px] text-slate-500 text-center font-mono">
          FAISS Vector Distance: Top 3 Cosine Neighbors
        </div>
      </div>
    </div>
  );
};
