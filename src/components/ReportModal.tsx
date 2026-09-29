import React from 'react';
import { ChangeDetectionItem } from '../types/intelligence';
import { X, Printer, Download, Shield, CheckCircle2, FileText } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ChangeDetectionItem;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `TERRASPHERE_INTEL_${item.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0c1424] border border-cyan-500/40 rounded-xl max-w-3xl w-full shadow-2xl text-slate-100 overflow-hidden flex flex-col my-8">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#080d17] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              CONFIDENTIAL // DGIS SATELLITE INTELLIGENCE DOSSIER
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Header Seal & Meta */}
          <div className="border-b border-slate-700/80 pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                TERRASPHERE SURVEILLANCE REPORT: {item.id.toUpperCase()}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Directorate General of Information Systems (DGIS) • Ministry of Defence
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs font-mono text-slate-300">
                <span>DATE: {new Date().toISOString().split('T')[0]}</span>
                <span>•</span>
                <span>CLASSIFICATION: OPERATIONAL CONFIDENTIAL</span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
              VERIFIED CONFIDENCE: {item.confidence}
            </div>
          </div>

          {/* Target Coordinates & Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Coordinates</span>
              <span className="font-mono text-cyan-300 font-semibold">{item.coordinates}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Change Category</span>
              <span className="text-slate-200 font-semibold">{item.category}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Footprint Area</span>
              <span className="font-mono text-purple-300 font-semibold">{item.areaChanged}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Distance to River</span>
              <span className="font-mono text-amber-300 font-semibold">{item.distanceToRiver}</span>
            </div>
          </div>

          {/* Imagery Evidence (Before vs After) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Optical Bi-Temporal Imagery Evidence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="h-44 rounded-lg overflow-hidden bg-black border border-slate-700">
                  <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Baseline: {item.beforeDate}</span>
                  <span>Sensor: Sentinel-2</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="h-44 rounded-lg overflow-hidden bg-black border border-slate-700">
                  <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Post-Event: {item.afterDate}</span>
                  <span className="text-red-400 font-bold">New Structures Identified</span>
                </div>
              </div>
            </div>
          </div>

          {/* RAG & OKF Summary */}
          <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Autonomous Intelligence Assessment
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">{item.description}</p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-300 block mb-1">Key Forensic Evidence:</span>
              <ul className="space-y-1 text-xs text-slate-300">
                {item.keyEvidence.map((ev, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-[#080d17] border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-800"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
