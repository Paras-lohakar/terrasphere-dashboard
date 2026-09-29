import React, { useState } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  MousePointer, 
  Hand, 
  Plus, 
  Minus, 
  Square, 
  Pentagon, 
  Ruler, 
  Layers, 
  Crosshair
} from 'lucide-react';
import { ChangeDetectionItem } from '../types/intelligence';
import { MAIN_SATELLITE_AOI_IMAGE } from '../data/mockIntelligenceData';

interface MapViewerProps {
  selectedItem: ChangeDetectionItem;
  detectedItems: ChangeDetectionItem[];
  onSelectItem: (item: ChangeDetectionItem) => void;
  onOpenFullscreen: () => void;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  selectedItem,
  detectedItems,
  onSelectItem,
  onOpenFullscreen
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'split' | 'timeline'>('map');
  const [activeTool, setActiveTool] = useState<string>('pointer');
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [activeLayers, setActiveLayers] = useState({
    satellite: true,
    detections: true,
    boundaries: true,
    labels: true
  });
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  return (
    <div className="relative flex-1 bg-[#070b13] border border-slate-800 rounded-lg overflow-hidden flex flex-col min-h-[360px] shadow-inner select-none">
      {/* Top Map Ribbon */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0c1322]/90 border-b border-slate-800 z-20">
        {/* View Switchers: Map View | Split View | Timeline View */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 p-0.5 rounded-md">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1 text-xs font-semibold rounded transition ${
              viewMode === 'map'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 text-xs font-semibold rounded transition ${
              viewMode === 'split'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 text-xs font-semibold rounded transition ${
              viewMode === 'timeline'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Timeline View
          </button>
        </div>

        {/* Coordinates Readout & Fullscreen Button */}
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-[11px] font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{selectedItem.coordinates}</span>
          </div>

          <button
            onClick={onOpenFullscreen}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded border border-slate-700 transition"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Map Viewport Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden cursor-crosshair">
        {/* Satellite Imagery Layer */}
        <img
          src={MAIN_SATELLITE_AOI_IMAGE}
          alt="Satellite AOI View"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel / 14})` }}
        />

        {/* Subtle coordinate grid crosshair overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />

        {/* Detection Overlay 1: Primary New Construction Box */}
        {activeLayers.detections && (
          <div
            onClick={() => onSelectItem(detectedItems[0])}
            className="absolute top-[32%] left-[42%] z-10 cursor-pointer group"
          >
            {/* Pulsing Target Reticle */}
            <div className="relative w-28 h-20 border-2 border-red-500 bg-red-500/15 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:bg-red-500/25 transition">
              {/* Corner brackets */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

              {/* Pulsing center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-red-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>

              {/* Callout Pointer line & Banner */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-lg border border-red-400 flex items-center gap-1.5 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>New Construction Detected</span>
              </div>
            </div>
          </div>
        )}

        {/* Detection Overlay 2: Secondary polygon overlays */}
        {activeLayers.detections && (
          <>
            {/* Land change polygon in bottom center */}
            <div
              onClick={() => onSelectItem(detectedItems[1] || detectedItems[0])}
              className="absolute top-[52%] left-[43%] w-24 h-16 border border-orange-500 bg-orange-500/20 rounded-[40%] rotate-12 cursor-pointer hover:bg-orange-500/30 transition flex items-center justify-center"
            >
              <span className="text-[9px] font-bold text-orange-200 bg-black/60 px-1 py-0.5 rounded">
                Land Change
              </span>
            </div>

            {/* River contour change tag */}
            <div
              onClick={() => onSelectItem(detectedItems[3] || detectedItems[0])}
              className="absolute top-[48%] left-[28%] w-20 h-10 border border-cyan-400 bg-cyan-400/20 rounded-full -rotate-45 cursor-pointer hover:bg-cyan-400/30 transition flex items-center justify-center"
            >
              <span className="text-[9px] font-bold text-cyan-200 bg-black/60 px-1 py-0.5 rounded">
                River Bed
              </span>
            </div>
          </>
        )}

        {/* Inset Map: India Locator (Top Right) */}
        <div className="absolute top-3 right-3 z-10 w-28 h-32 rounded-lg bg-[#0c1424]/90 border border-slate-700/80 shadow-2xl p-1.5 backdrop-blur-sm pointer-events-auto">
          <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>India AOI Inset</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <div className="relative w-full h-24 bg-slate-950 rounded overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Vector silhouette of India */}
            <svg viewBox="0 0 100 120" className="w-full h-full opacity-70">
              <path
                d="M 45 5 L 55 10 L 60 20 L 52 30 L 70 38 L 85 45 L 80 55 L 70 52 L 65 65 L 55 85 L 50 110 L 45 85 L 35 70 L 25 55 L 20 40 L 30 30 L 42 20 Z"
                fill="#164e63"
                stroke="#22d3ee"
                strokeWidth="1.5"
              />
              {/* Nagpur / Central AOI target beacon */}
              <circle cx="50" cy="55" r="4" fill="#ef4444" className="animate-ping" />
              <circle cx="50" cy="55" r="2.5" fill="#f87171" stroke="#ffffff" strokeWidth="0.8" />
            </svg>
            <div className="absolute bottom-1 left-1 text-[8px] font-mono text-cyan-300">
              21.14°N 79.08°E
            </div>
          </div>
        </div>

        {/* Floating Tool Overlay (Left Margin) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 bg-[#0c1322]/90 border border-slate-700/80 rounded-lg p-1 shadow-2xl backdrop-blur-sm">
          {[
            { id: 'pointer', icon: MousePointer, label: 'Select' },
            { id: 'hand', icon: Hand, label: 'Pan' },
            { id: 'zoom_in', icon: Plus, label: 'Zoom In', action: () => setZoomLevel((z) => Math.min(z + 1, 18)) },
            { id: 'zoom_out', icon: Minus, label: 'Zoom Out', action: () => setZoomLevel((z) => Math.max(z - 1, 10)) },
            { id: 'box', icon: Square, label: 'Draw Bounding Box' },
            { id: 'polygon', icon: Pentagon, label: 'Draw Polygon' },
            { id: 'ruler', icon: Ruler, label: 'Measure Distance' },
            { id: 'layers', icon: Layers, label: 'Toggle Layers', action: () => setShowLayerMenu(!showLayerMenu) }
          ].map((tool) => {
            const Icon = tool.icon;
            const isCurrent = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  if (tool.action) {
                    tool.action();
                  } else {
                    setActiveTool(tool.id);
                  }
                }}
                title={tool.label}
                className={`p-1.5 rounded transition ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Layer Visibility Menu */}
        {showLayerMenu && (
          <div className="absolute top-3 left-14 z-20 w-44 rounded-lg bg-[#0e1626] border border-slate-700 shadow-2xl p-2.5 text-xs text-slate-200">
            <span className="font-semibold text-[11px] text-slate-400 block mb-2">GIS Layers</span>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.satellite}
                  onChange={(e) => setActiveLayers({ ...activeLayers, satellite: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600"
                />
                <span>Sentinel-2 RGB (10m)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.detections}
                  onChange={(e) => setActiveLayers({ ...activeLayers, detections: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600"
                />
                <span>Change Annotations</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.boundaries}
                  onChange={(e) => setActiveLayers({ ...activeLayers, boundaries: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600"
                />
                <span>Cadastral / River Buffer</span>
              </label>
            </div>
          </div>
        )}

        {/* Floating Classification Legend (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 bg-[#0c1424]/90 border border-slate-700/80 rounded-lg p-2.5 shadow-2xl backdrop-blur-sm text-[11px] text-slate-300 space-y-1.5 min-w-[150px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500 shrink-0" />
            <span>New Construction</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 shrink-0" />
            <span>Land Change</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0" />
            <span>Vegetation Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shrink-0" />
            <span>Water Change</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shrink-0" />
            <span>Road Development</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 shrink-0" />
            <span>Other Changes</span>
          </div>
        </div>

        {/* Scale Bar (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-10 bg-[#0c1424]/90 border border-slate-700/80 rounded px-2.5 py-1 text-[10px] font-mono text-slate-300 shadow backdrop-blur-sm">
          <div className="flex justify-between w-28 text-[9px] text-slate-400 mb-0.5">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>5 km</span>
          </div>
          <div className="h-1.5 w-28 bg-slate-700 rounded-sm overflow-hidden flex border border-slate-600">
            <div className="w-1/4 bg-white" />
            <div className="w-1/4 bg-slate-900" />
            <div className="w-1/4 bg-white" />
            <div className="w-1/4 bg-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
};
