import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Bell, 
  Layers, 
  MapPin, 
  Calendar, 
  CloudSun, 
  Cpu, 
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  AlertCircle,
  Download,
  LogOut,
  Shield
} from 'lucide-react';
import { FilterState } from '../types/intelligence';
import { EXAMPLE_QUERIES } from '../data/mockIntelligenceData';
import { AnalystUser } from './AnalystLogin';

interface HeaderProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  activeView: 'dashboard' | 'techstack';
  setActiveView: (view: 'dashboard' | 'techstack') => void;
  onOpenBackendGuide: () => void;
  currentUser?: AnalystUser | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  onSearch,
  filters,
  setFilters,
  onRunAnalysis,
  isAnalyzing,
  activeView,
  setActiveView,
  onOpenBackendGuide,
  currentUser,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAoiModal, setShowAoiModal] = useState(false);

  const notifications = [
    { id: 1, title: 'Priority Alert: New Construction River Sector', time: '14m ago', unread: true },
    { id: 2, title: 'Sentinel-2 Tile T43QFB Ingestion Complete', time: '1h ago', unread: true },
    { id: 3, title: 'Siamese CNN Model Calibration Verified (v3.2)', time: '3h ago', unread: false }
  ];

  return (
    <header className="bg-[#0e1626] border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-lg">
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b border-slate-800/80 gap-3">
        {/* Left: Branding & National Security Seals */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-blue-600/30 border border-cyan-500/40 shadow-inner">
            <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400">
                TERRASPHERE
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">
              AI-Powered Satellite Intelligence for National Security
            </p>
          </div>

          <div className="hidden md:flex items-center h-8 w-px bg-slate-700/60 mx-1" />

          {/* Ministry of Defence / Indian Army Emblem lockup */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded bg-slate-900/60 border border-slate-800">
            {/* National emblem badge graphic */}
            <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400 font-bold">
              ★
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-semibold text-amber-400/90 block">Ministry of Defence (MoD)</span>
              <span className="text-slate-400 text-[10px] block">Indian Army (DGIS)</span>
            </div>
          </div>
        </div>

        {/* Right Controls: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg bg-[#0e1626] border border-slate-700 shadow-2xl p-2 z-50">
                <div className="flex items-center justify-between pb-2 px-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Operational Alerts</span>
                  <span className="text-[10px] text-cyan-400 cursor-pointer">Mark read</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 hover:bg-slate-800/40 rounded transition text-xs">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-200">{n.title}</p>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative pl-1 border-l border-slate-800">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/60 transition text-left"
              title="Analyst Profile & Security Scope"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-bold text-white text-xs border border-cyan-400/30 shadow">
                {currentUser?.name ? currentUser.name[0] : 'A'}
              </div>
              <div className="hidden sm:block text-left text-xs leading-none">
                <span className="font-semibold text-slate-200 block truncate max-w-[110px]">
                  {currentUser?.name || 'Analyst'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentUser?.id || 'DGIS | MoD'}
                </span>
              </div>
            </button>

            {/* Profile & Security Scope Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0c1424] border border-cyan-500/40 shadow-2xl p-4 z-50 text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 text-sm">
                    {currentUser?.name ? currentUser.name[0] : 'A'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-100 truncate">{currentUser?.name || 'Capt. A. Sharma'}</p>
                    <p className="text-[11px] font-mono text-cyan-400">{currentUser?.id || 'DGIS-7429'}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser?.department || 'DGIS | Ministry of Defence'}</p>
                  </div>
                </div>

                <div className="py-2.5 space-y-1.5 text-[11px] font-mono border-b border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Clearance:</span>
                    <span className="text-emerald-400 font-semibold truncate max-w-[140px]">
                      {currentUser?.clearanceLevel || 'LEVEL 3 (TOP SECRET)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Callsign:</span>
                    <span className="text-amber-400">{currentUser?.callsign || 'VANGUARD-4'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Badge ID:</span>
                    <span className="text-slate-400">{currentUser?.badgeId || 'IN-DEF-88219-GEO'}</span>
                  </div>
                </div>

                {onLogout && (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full mt-3 py-2 px-3 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 text-rose-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Lock Console / Sign Out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Query Bar & Example Queries Row */}
      <div className="px-4 py-2.5 bg-[#0b1220]/90 border-b border-slate-800/90 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Natural Language Query Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query);
          }}
          className="flex-1 flex items-center gap-2 max-w-3xl"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find any location, change, object... e.g. Find new construction near this river between 2023 and 2025"
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner font-normal"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition shadow flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </form>

        {/* Example Queries Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-1">
            Example Queries:
          </span>
          {EXAMPLE_QUERIES.map((eq) => (
            <button
              key={eq}
              onClick={() => {
                setQuery(eq);
                onSearch(eq);
              }}
              className="px-2.5 py-1 text-[11px] rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-300 hover:text-white transition whitespace-nowrap shrink-0 shadow-sm"
            >
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Parameters Bar */}
      <div className="px-4 py-2 bg-[#090e18] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
          {/* Data Source */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Data Source:</span>
            <select
              value={filters.dataSource}
              onChange={(e) => setFilters({ ...filters, dataSource: e.target.value })}
              className="bg-slate-900 border border-slate-700 text-slate-200 py-1 px-2 rounded text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="Sentinel-1, Sentinel-2">Sentinel-1, Sentinel-2</option>
              <option value="Sentinel-2 (Optical)">Sentinel-2 (Optical)</option>
              <option value="Sentinel-1 (SAR)">Sentinel-1 (SAR)</option>
              <option value="Landsat 8/9">Landsat 8/9</option>
              <option value="Bhuvan (ISRO datasets)">Bhuvan (ISRO datasets)</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Date Range:</span>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <input
                type="text"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="bg-transparent w-20 text-center focus:outline-none"
              />
              <span className="text-slate-500">→</span>
              <input
                type="text"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="bg-transparent w-20 text-center focus:outline-none"
              />
            </div>
          </div>

          {/* AOI */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">AOI:</span>
            <button
              onClick={() => setShowAoiModal(true)}
              className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-dashed border-cyan-500/60 rounded px-2.5 py-1 text-cyan-300 text-xs transition"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{filters.aoiName || 'Draw / Upload / Select'}</span>
            </button>
          </div>

          {/* Cloud Cover */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Cloud Cover:</span>
            <select
              value={filters.cloudCover}
              onChange={(e) => setFilters({ ...filters, cloudCover: e.target.value })}
              className="bg-slate-900 border border-slate-700 text-slate-200 py-1 px-2 rounded text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="< 10%">&lt; 10%</option>
              <option value="< 20%">&lt; 20%</option>
              <option value="< 30%">&lt; 30%</option>
              <option value="All">All</option>
            </select>
          </div>

          {/* Sensor Type */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Sensor Type:</span>
            <select
              value={filters.sensorType}
              onChange={(e) => setFilters({ ...filters, sensorType: e.target.value })}
              className="bg-slate-900 border border-slate-700 text-slate-200 py-1 px-2 rounded text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Optical">Optical</option>
              <option value="SAR">SAR</option>
              <option value="Thermal">Thermal</option>
            </select>
          </div>

          {/* Resolution */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Resolution:</span>
            <select
              value={filters.resolution}
              onChange={(e) => setFilters({ ...filters, resolution: e.target.value })}
              className="bg-slate-900 border border-slate-700 text-slate-200 py-1 px-2 rounded text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="All">All</option>
              <option value="10m">10m</option>
              <option value="5m">5m</option>
              <option value="1m">1m</option>
            </select>
          </div>
        </div>

        {/* Primary Action Button: Run Analysis */}
        <button
          onClick={onRunAnalysis}
          disabled={isAnalyzing}
          className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:from-emerald-700 active:to-green-700 rounded-md shadow-md hover:shadow-emerald-900/40 transition flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Swath...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run Analysis</span>
            </>
          )}
        </button>
      </div>

      {/* AOI Drawer / Modal */}
      {showAoiModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-cyan-500/40 rounded-xl p-5 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Select Area of Interest (AOI)
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Choose preconfigured strategic sectors or draw bounding geometry on map.
            </p>
            <div className="space-y-2">
              {[
                { name: 'Nagpur River Basin (Sector 7)', coords: '21.1456° N, 79.0883° E' },
                { name: 'Northern Border Foothills Corridor', coords: '34.2268° N, 77.5619° E' },
                { name: 'Eastern River Island Estuary', coords: '26.1834° N, 91.7478° E' },
                { name: 'Custom Drawn Bounding Polygon', coords: 'User Defined' }
              ].map((aoi) => (
                <button
                  key={aoi.name}
                  onClick={() => {
                    setFilters({ ...filters, aoiName: aoi.name });
                    setShowAoiModal(false);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 transition text-xs flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-200">{aoi.name}</p>
                    <span className="text-[10px] text-slate-400">{aoi.coords}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowAoiModal(false)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
