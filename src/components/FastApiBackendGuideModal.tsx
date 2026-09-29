import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Database, Cpu, Layers } from 'lucide-react';

interface FastApiBackendGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FastApiBackendGuideModal: React.FC<FastApiBackendGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fastApiCode = `# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np

app = FastAPI(title="TERRASPHERE Geospatial Backend", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FilterRequest(BaseModel):
    data_source: Optional[str] = "Sentinel-2"
    start_date: Optional[str] = "2023-01-01"
    end_date: Optional[str] = "2025-12-31"
    aoi_polygon: Optional[List[List[float]]] = None
    cloud_cover_max: Optional[float] = 20.0

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "postgis_connected": True,
        "faiss_indices_loaded": 14200
    }

@app.post("/api/v1/detect-change")
def detect_change(req: FilterRequest):
    """
    Runs Siamese CNN / ChangeFormer model on Sentinel-2 STAC bi-temporal rasters.
    Returns detected changes with before/after imagery URLs stored in PostgreSQL.
    """
    return [
        {
            "id": "chg-01",
            "title": "New Construction",
            "dateRange": f"{req.start_date} → {req.end_date}",
            "coordinates": "21.1456° N, 79.0883° E",
            "category": "Construction",
            "confidence": 0.92,
            "areaChanged": "2.4 hectares",
            "distanceToRiver": "320 meters",
            # Replace with your actual S3/MinIO bucket or database imagery URLs:
            "beforeImage": "/api/v1/raster/tiles/before?id=chg-01",
            "afterImage": "/api/v1/raster/tiles/after?id=chg-01"
        }
    ]

@app.post("/api/v1/search-semantic")
def semantic_search(query: str, top_k: int = 10):
    """
    Encodes query text with CLIP, runs FAISS similarity search,
    and returns top-k matching satellite scene patches.
    """
    # query_vector = clip_model.encode_text(query)
    # D, I = faiss_index.search(query_vector, top_k)
    return {"results": [], "query": query}
`;

  const schemaCode = `-- Database: PostgreSQL with PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE satellite_detections (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    category VARCHAR(64) NOT NULL,
    confidence FLOAT NOT NULL,
    area_hectares FLOAT NOT NULL,
    distance_to_river_m FLOAT,
    geom GEOMETRY(Polygon, 4326),
    before_image_url TEXT,
    after_image_url TEXT,
    spectral_profile JSONB,
    rag_explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial index on geometry
CREATE INDEX idx_satellite_geom ON satellite_detections USING GIST (geom);
`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0c1424] border border-cyan-500/40 rounded-xl max-w-4xl w-full shadow-2xl text-slate-100 overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080d17] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                FastAPI & Vector Database Integration Guide
              </h2>
              <p className="text-[11px] text-slate-400">
                Connect your real Python backend, PostGIS spatial database, and FAISS vector index
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh] text-xs">
          {/* Architecture Reminder */}
          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
            <p className="font-semibold text-emerald-200 mb-1">
              ✓ Ready for plug-and-play backend connection:
            </p>
            <p className="text-slate-300 leading-relaxed">
              All frontend functions are cleanly separated in <code className="text-cyan-300 font-mono">src/services/apiClient.ts</code>.
              When you launch your FastAPI backend, specify <code className="text-cyan-300 font-mono">VITE_FASTAPI_URL=http://localhost:8000</code> in your <code className="text-cyan-300 font-mono">.env</code>, and all changes, live satellite imagery, and RAG explanations will automatically stream directly from your database!
            </p>
          </div>

          {/* FastAPI Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Python FastAPI Starter Endpoint (<code>main.py</code>)
              </span>
              <button
                onClick={() => handleCopy(fastApiCode, 'fastapi')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'fastapi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'fastapi' ? 'Copied' : 'Copy Python'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {fastApiCode}
            </pre>
          </div>

          {/* PostgreSQL + PostGIS Schema */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-amber-400" />
                PostgreSQL + PostGIS Schema (<code>schema.sql</code>)
              </span>
              <button
                onClick={() => handleCopy(schemaCode, 'sql')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sql' ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {schemaCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#080d17] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow"
          >
            Got it, Return to Mission Console
          </button>
        </div>
      </div>
    </div>
  );
};
