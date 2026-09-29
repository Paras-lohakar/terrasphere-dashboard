import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Layers, Compass } from 'lucide-react';
import { ChangeDetectionItem } from '../types/intelligence';

interface FullscreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  item: ChangeDetectionItem;
}

export const FullscreenViewer: React.FC<FullscreenViewerProps> = ({
  isOpen,
  onClose,
  item
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [splitPos, setSplitPos] = useState<number>(50);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col text-slate-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#0c1424] border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
          <div>
            <h2 className="text-sm font-bold text-white">
              Tactical High-Resolution Satellite Inspector: {item.title} ({item.coordinates})
            </h2>
            <p className="text-[11px] text-slate-400">
              Sensor: {item.sensor} • Resolution: {item.resolution} • Cloud: {item.cloudCover}
            </p>
          </div>
        </div>

        {/* Zoom controls & close */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-cyan-400">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 overflow-hidden flex items-center justify-center p-4">
        <div
          className="relative max-w-5xl w-full h-[80vh] rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-black select-none"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          {/* Before Frame (Left) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-cyan-400"
            style={{ width: `${splitPos}%` }}
          >
            <img
              src={item.beforeImage}
              alt="Before"
              className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '800px' }}
            />
            <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-xs font-mono font-bold text-white border border-slate-700">
              BEFORE: {item.beforeDate}
            </div>
          </div>

          {/* After Frame (Right) */}
          <div
            className="absolute inset-y-0 right-0 overflow-hidden"
            style={{ width: `${100 - splitPos}%` }}
          >
            <img
              src={item.afterImage}
              alt="After"
              className="absolute top-0 right-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '800px' }}
            />
            <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded text-xs font-mono font-bold text-red-400 border border-slate-700">
              AFTER: {item.afterDate} (NEW CONSTRUCTION)
            </div>
          </div>

          {/* Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)] flex items-center justify-center -translate-x-1/2 cursor-ew-resize"
            style={{ left: `${splitPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center border-2 border-white shadow-xl text-xs">
              ⇔
            </div>
          </div>

          <input
            type="range"
            min="5"
            max="95"
            value={splitPos}
            onChange={(e) => setSplitPos(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
          />
        </div>
      </div>
    </div>
  );
};
