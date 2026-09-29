import React, { useState } from 'react';
import { 
  ChangeDetectionItem 
} from '../types/intelligence';
import { 
  RotateCw, 
  Maximize2, 
  FilePlus, 
  Info, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  MapPin,
  Ruler,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface DetailedAnalysisProps {
  item: ChangeDetectionItem;
  onOpenFullscreen: () => void;
  onAddToReport: (item: ChangeDetectionItem) => void;
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  item,
  onOpenFullscreen,
  onAddToReport
}) => {
  const [activeTab, setActiveTab] = useState<'before_after' | 'change_map' | 'time_series' | 'metadata' | 'provenance'>('before_after');
  const [splitPosition, setSplitPosition] = useState<number>(50);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string>('2025-06');
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [explanationText, setExplanationText] = useState<string>(item.description);

  const handleRegenerateExplanation = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setExplanationText(
        `[Re-evaluated OKF Inference]: Multi-temporal verification across Sentinel-2 (T43QFB) confirms significant structural footprint alteration. Target zone reflects concrete foundations and roof structures erected between December 2024 and March 2025 with 0.92 cross-correlation confidence.`
      );
      setIsRegenerating(false);
    }, 600);
  };

  return (
    <div className="bg-[#090e18] border border-slate-800 rounded-lg p-3 shadow-md flex flex-col gap-3">
      {/* Top Header & Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span>Selected Result – Detailed Analysis</span>
          <span className="text-xs font-mono font-normal text-slate-400">({item.id})</span>
        </h3>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 bg-[#0c1424] p-0.5 rounded-md border border-slate-700/80 text-xs">
          {[
            { id: 'before_after', label: 'Before / After' },
            { id: 'change_map', label: 'Change Map' },
            { id: 'time_series', label: 'Time Series' },
            { id: 'metadata', label: 'Metadata' },
            { id: 'provenance', label: 'Provenance (OKF)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 font-medium rounded transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Column 1: Before / After Interactive Split Inspection (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#070b13] border border-slate-800 rounded-lg p-2.5">
          {/* Side-by-side / Interactive split container */}
          <div className="relative w-full h-56 sm:h-64 rounded-md overflow-hidden bg-black select-none border border-slate-800">
            {/* Split Views */}
            <div className="absolute inset-0 flex">
              {/* Before Frame (Left) */}
              <div
                className="relative h-full overflow-hidden border-r border-cyan-400/80"
                style={{ width: `${splitPosition}%` }}
              >
                <img
                  src={item.beforeImage}
                  alt="Before State"
                  className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '320px' }}
                />
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-medium border border-slate-700 shadow">
                  Before ({item.beforeDate})
                </div>
                <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 border border-slate-700">
                  {item.sensor.split(' ')[0]} | {item.resolution} | {item.coordinates}
                  <span className="block text-slate-400">Cloud: 5%</span>
                </div>
              </div>

              {/* After Frame (Right) */}
              <div
                className="relative h-full overflow-hidden"
                style={{ width: `${100 - splitPosition}%` }}
              >
                <img
                  src={item.afterImage}
                  alt="After State"
                  className="absolute top-0 right-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '320px' }}
                />
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-medium border border-slate-700 shadow">
                  After ({item.afterDate})
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 border border-slate-700 text-right">
                  {item.sensor.split(' ')[0]} | {item.resolution} | {item.coordinates}
                  <span className="block text-slate-400">Cloud: 7%</span>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] cursor-ew-resize flex items-center justify-center -translate-x-1/2"
              style={{ left: `${splitPosition}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-lg border border-white">
                ⇔
              </div>
            </div>

            {/* Hidden native slider input for mouse/touch tracking */}
            <input
              type="range"
              min="10"
              max="90"
              value={splitPosition}
              onChange={(e) => setSplitPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
            />
          </div>

          {/* Multi-temporal Thumbnail Strip */}
          <div className="mt-2.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 px-1">
              <span>Multi-Temporal Ingestion History</span>
              <span className="font-mono text-cyan-400">Swipe to compare</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button className="p-1 text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {item.temporalSnapshots.map((snap) => {
                const isSelected = selectedSnapshot === snap.period;
                return (
                  <button
                    key={snap.period}
                    onClick={() => setSelectedSnapshot(snap.period)}
                    className={`flex flex-col items-center p-1 rounded border transition shrink-0 ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-7 rounded overflow-hidden mb-1 relative bg-black">
                      <img src={snap.image} alt={snap.label} className="w-full h-full object-cover" />
                      {snap.hasChange && (
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      )}
                    </div>
                    <span className="text-[9px] font-mono">{snap.label}</span>
                  </button>
                );
              })}
              <button className="p-1 text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Change Analysis Result Card (4 cols) */}
        <div className="lg:col-span-4 bg-[#070b13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold text-slate-200">Change Analysis Result</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                High Confidence ({item.confidence})
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Change Type</span>
                <span className="font-semibold text-slate-100">{item.title}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Area Changed</span>
                <span className="font-mono text-cyan-300 font-semibold">{item.areaChanged}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">First Observed</span>
                <span className="font-mono text-slate-200">{item.firstObserved}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Location</span>
                <span className="font-mono text-slate-200">{item.coordinates}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Distance to River</span>
                <span className="font-mono text-amber-400 font-semibold">{item.distanceToRiver}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Nearby Features</span>
                <span className="text-slate-200 text-right">{item.nearbyFeatures.join(', ')}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Possible Activity</span>
                <span className="text-emerald-400 font-medium">{item.possibleActivity}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Sensor</span>
                <span className="font-mono text-slate-200">{item.sensor}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-400">Resolution</span>
                <span className="font-mono text-slate-200">{item.resolution}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Cloud Cover</span>
                <span className="text-slate-200">{item.cloudCover}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={onOpenFullscreen}
              className="flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View in Full Screen</span>
            </button>
            <button
              onClick={() => onAddToReport(item)}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded text-xs font-medium transition flex items-center gap-1.5"
            >
              <FilePlus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add to Report</span>
            </button>
          </div>
        </div>

        {/* Column 3: AI Explanation (RAG + OKF) (3 cols) */}
        <div className="lg:col-span-3 bg-[#070b13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Explanation (RAG + OKF)</span>
              </h4>
              <button
                onClick={handleRegenerateExplanation}
                disabled={isRegenerating}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded transition"
              >
                <RotateCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>Regenerate</span>
              </button>
            </div>

            {/* AI Synthesized Text */}
            <p className="text-[11px] leading-relaxed text-slate-300 mb-2.5">
              {explanationText}
            </p>

            {/* Key Evidence */}
            <div className="mb-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Key Evidence:
              </p>
              <ul className="space-y-1 text-[10px] text-slate-300">
                {item.keyEvidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Interpretation */}
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[10px]">
              <span className="font-bold text-amber-400 block mb-0.5">Possible Interpretation:</span>
              <p className="text-slate-300 leading-normal">{item.interpretation}</p>
            </div>
          </div>

          {/* Provenance note footer */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-start gap-1.5 text-[9px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-cyan-500/80 shrink-0 mt-0.5" />
            <p>
              This explanation is generated using retrieved evidence from OKF knowledge base and local AI model.
              Please verify before use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
