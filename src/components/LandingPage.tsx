import React, { useState } from 'react';
import { 
  TECH_STACK_LAYERS,
  MAIN_SATELLITE_AOI_IMAGE
} from '../data/mockIntelligenceData';
import { 
  Compass, 
  ChevronRight, 
  ShieldCheck, 
  Play, 
  Cpu, 
  Database, 
  Layers, 
  Brain, 
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  Download
} from 'lucide-react';
import { TechStackLayer } from '../types/intelligence';

interface LandingPageProps {
  onLaunchDashboard: () => void;
  onOpenBackendGuide: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchDashboard,
  onOpenBackendGuide
}) => {
  const [selectedLayer, setSelectedLayer] = useState<TechStackLayer>(TECH_STACK_LAYERS[0]);

  return (
    <div className="min-h-screen bg-[#080d17] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      {/* Top Navigation */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-[#0a101f]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center border border-cyan-400/40 shadow-inner">
            <Compass className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400">
              TERRASPHERE
            </span>
            <span className="hidden sm:inline-block ml-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Defence Geospatial Intelligence (DGIS)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/terrasphere-project.zip"
            download="terrasphere-project.zip"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900/50 transition flex items-center gap-1.5"
            title="Download ZIP for VS Code"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download ZIP</span>
          </a>
          <button
            onClick={onOpenBackendGuide}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/30 transition flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>FastAPI Specs</span>
          </button>
          <button
            onClick={onLaunchDashboard}
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-900/40 transition flex items-center gap-2 cursor-pointer"
          >
            <span>Open Mission Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-16 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Left Content */}
        <div className="flex-1 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>AIR-GAPPED SOVEREIGN SATELLITE INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight mb-4">
            Autonomous Bi-Temporal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400">
              Change Detection & Strategic RAG
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            Multi-sensor earth observation platform integrating Sentinel-1/2, Landsat, and ISRO Bhuvan imagery.
            Powered by Siamese CNNs, ChangeFormer attention, and on-premises RAG for military and environmental surveillance.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onLaunchDashboard}
              className="px-6 py-3 rounded-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 hover:opacity-95 shadow-xl shadow-cyan-900/50 transition flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Launch Mission Dashboard</span>
            </button>

            <button
              onClick={onOpenBackendGuide}
              className="px-5 py-3 rounded-lg text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Backend & Database Stack</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div>
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 block">10m</span>
              <span className="text-slate-400">Sentinel-2 Optical Swath</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 block">&lt; 80ms</span>
              <span className="text-slate-400">FAISS Patch Vector Match</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold font-mono text-purple-400 block">100%</span>
              <span className="text-slate-400">Offline Air-Gapped Operation</span>
            </div>
          </div>
        </div>

        {/* Hero Right Visual Preview */}
        <div className="flex-1 w-full max-w-lg z-10">
          <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-slate-950 group">
            <img
              src={MAIN_SATELLITE_AOI_IMAGE}
              alt="Mission Preview"
              className="w-full h-80 object-cover opacity-90 group-hover:scale-105 transition duration-500"
            />
            {/* Overlay Grid & Targeting Reticle */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e18] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-cyan-300 border border-slate-700">
              TARGET: 21.1456° N, 79.0883° E
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Nagpur Sector Active Surveillance</p>
                <p className="text-[11px] text-emerald-400">High Confidence Change Detection (0.92)</p>
              </div>
              <button
                onClick={onLaunchDashboard}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Diagram (Exact Replica of Reference Image 1) */}
      <section className="px-6 py-12 bg-[#060a12] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
              System Architecture & Component Diagram
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              The 9-Tier Geospatial Intelligence Stack
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
              Engineered for seamless offline deployment with Python FastAPI, PyTorch, PostGIS, and high-performance React frontends.
            </p>
          </div>

          {/* 9 Stages Interactive Chevron Pipeline */}
          <div className="space-y-3">
            {TECH_STACK_LAYERS.map((layer) => {
              const isSelected = selectedLayer.number === layer.number;
              return (
                <div
                  key={layer.number}
                  onClick={() => setSelectedLayer(layer)}
                  className={`rounded-xl border transition-all cursor-pointer p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-lg ring-1 ring-cyan-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  {/* Left: Number badge & Layer Title */}
                  <div className="flex items-center gap-4 min-w-[240px]">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center font-bold text-sm text-cyan-300 shadow">
                      {layer.number}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{layer.title}</h3>
                      <span className="text-[11px] text-slate-400">
                        {layer.components.length} Core Modules
                      </span>
                    </div>
                  </div>

                  {/* Center: Component Pills */}
                  <div className="flex-1 flex flex-wrap items-center gap-3">
                    {layer.components.map((c) => (
                      <div
                        key={c.name}
                        className="px-3 py-1.5 rounded-lg bg-[#0e1626] border border-slate-700 text-xs flex items-center gap-2 shadow-sm"
                      >
                        <span className="font-bold text-slate-200">{c.name}</span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          — {c.tagline}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right: Inspection Chevron */}
                  <div className="hidden md:flex items-center text-cyan-400 text-xs font-semibold gap-1">
                    <span>Inspect</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Layer Deep Dive Card */}
          <div className="mt-8 p-6 rounded-xl bg-[#0c1424] border border-cyan-500/40 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-cyan-600/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                  TIER 0{selectedLayer.number}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedLayer.title} Specification</h3>
              </div>
              <button
                onClick={onLaunchDashboard}
                className="text-xs text-cyan-400 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>View In Mission Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedLayer.components.map((comp) => (
                <div key={comp.name} className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-100">{comp.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {comp.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{comp.description}</p>
                  {comp.pythonOrJsPkg && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Package:</span>
                      <span className="text-cyan-300 font-semibold">{comp.pythonOrJsPkg}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-6 border-t border-slate-800 bg-[#070b13] text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>TERRASPHERE • Ministry of Defence (MoD) • Directorate General of Information Systems (DGIS)</p>
        <p className="font-mono text-slate-500">Air-Gapped Sovereign AI System • FastApi/PostGIS Ready</p>
      </footer>
    </div>
  );
};
