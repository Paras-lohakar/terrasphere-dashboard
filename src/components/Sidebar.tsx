import React from 'react';
import {
  LayoutDashboard,
  Search,
  TrendingUp,
  History,
  MapPin,
  FolderKanban,
  FileText,
  Database,
  Cpu,
  BookOpen,
  Bot,
  Activity,
  Radio,
  Sliders
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenRagAssistant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onOpenRagAssistant
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Search & Discovery', icon: Search },
    { id: 'change_analysis', label: 'Change Analysis', icon: TrendingUp },
    { id: 'multi_temporal', label: 'Multi-Temporal View', icon: History },
    { id: 'geospatial_tools', label: 'AOI & Geospatial Tools', icon: MapPin },
    { id: 'my_analysis', label: 'My Analysis', icon: FolderKanban },
    { id: 'reports', label: 'Reports & Export', icon: FileText, action: onOpenReportModal },
    { id: 'catalog', label: 'Data Catalog', icon: Database },
    { id: 'model_provenance', label: 'Model & Provenance', icon: Cpu },
    { id: 'okf_knowledge', label: 'OKF Knowledge', icon: BookOpen },
    { id: 'rag_assistant', label: 'RAG Assistant', icon: Bot, action: onOpenRagAssistant },
    { id: 'monitoring', label: 'System Monitoring', icon: Activity }
  ];

  return (
    <aside className="w-56 shrink-0 bg-[#090e18] border-r border-slate-800 flex flex-col justify-between h-[calc(100vh-108px)] overflow-y-auto text-slate-300 select-none">
      {/* Primary Navigation Menu */}
      <div className="py-2">
        <div className="px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-all text-left ${
                  isActive
                    ? 'bg-blue-600/90 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Utility Tools */}
      <div className="p-3 border-t border-slate-800/80 bg-[#060a12]/80 space-y-1">
        <button
          onClick={() => setActiveTab('time_series')}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 rounded transition"
        >
          <History className="w-3.5 h-3.5 text-cyan-400" />
          <span className="truncate">Time Series Analysis</span>
        </button>
        <button
          onClick={() => setActiveTab('linear_profiling')}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 rounded transition"
        >
          <Radio className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate">Linear Profiling COG</span>
        </button>
        <button
          onClick={() => setActiveTab('open_raster')}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 rounded transition"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate">Open Raster Cogis</span>
        </button>
      </div>
    </aside>
  );
};
