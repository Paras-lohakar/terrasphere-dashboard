import React, { useState } from 'react';
import { ChangeDetectionItem } from '../types/intelligence';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';

interface DetectedChangesListProps {
  items: ChangeDetectionItem[];
  selectedItem: ChangeDetectionItem;
  onSelectItem: (item: ChangeDetectionItem) => void;
}

export const DetectedChangesList: React.FC<DetectedChangesListProps> = ({
  items,
  selectedItem,
  onSelectItem
}) => {
  const [activeTab, setActiveTab] = useState<'detected' | 'search' | 'similar'>('detected');

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Construction':
        return 'bg-red-600/90 text-white border-red-500/50';
      case 'Road':
        return 'bg-amber-600/90 text-white border-amber-500/50';
      case 'Forest':
        return 'bg-emerald-600/90 text-white border-emerald-500/50';
      case 'Water':
        return 'bg-blue-600/90 text-white border-blue-500/50';
      default:
        return 'bg-purple-600/90 text-white border-purple-500/50';
    }
  };

  return (
    <div className="w-80 xl:w-96 shrink-0 bg-[#090e18] border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-md">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#0c1424] p-1 text-xs">
        <button
          onClick={() => setActiveTab('detected')}
          className={`flex-1 py-1.5 px-2 font-medium text-center rounded transition ${
            activeTab === 'detected'
              ? 'bg-blue-600 text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Detected Changes ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-1.5 px-2 font-medium text-center rounded transition ${
            activeTab === 'search'
              ? 'bg-blue-600 text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Search Results (48)
        </button>
        <button
          onClick={() => setActiveTab('similar')}
          className={`flex-1 py-1.5 px-2 font-medium text-center rounded transition ${
            activeTab === 'similar'
              ? 'bg-blue-600 text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Similar Locations (20)
        </button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80 p-2 space-y-2">
        {items.map((item, idx) => {
          const isSelected = selectedItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer flex gap-3 ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              {/* Thumbnail with sequential index */}
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-slate-950 shrink-0 border border-slate-700/60 shadow">
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 w-4 h-4 rounded bg-black/70 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
              </div>

              {/* Information Column */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-100 truncate">{item.title}</h4>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded border leading-none ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{item.dateRange}</span>
                  </div>

                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{item.coordinates}</span>
                  </div>
                </div>

                {/* Bottom Row: Confidence & View Action */}
                <div className="mt-1 flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-300">
                    <span className="text-slate-400">Confidence </span>
                    <span className="font-semibold text-emerald-400">{item.confidence}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className={`px-3 py-1 text-[10px] font-semibold rounded border transition ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white border-slate-700'
                    }`}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
