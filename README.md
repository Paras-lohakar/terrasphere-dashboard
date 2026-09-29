<<<<<<< HEAD
# TERRASPHERE: AI-Powered Satellite Intelligence

A mission-ready geospatial surveillance platform featuring multi-temporal change detection, Siamese CNN models, STAC satellite ingestion, PostGIS vector layers, and air-gapped RAG intelligence.

---

## ⚡ Quick Start in VS Code

### 1. Extract the Project
Extract `terrasphere-project.zip` and open the folder in VS Code:
```bash
unzip terrasphere-project.zip -d terrasphere
cd terrasphere
code .
```

---

### 2. Run the React Frontend (Terminal 1)

1. Open a new terminal in VS Code (`Ctrl + ~` or `Cmd + ~`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Run the FastAPI Backend (Terminal 2)

1. Open a second terminal split in VS Code.
2. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
3. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```
4. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
6. Verify the backend at [http://localhost:8000/docs](http://localhost:8000/docs).

---

### 4. 100% Offline / Air-Gapped Evaluation (Internet Turned OFF)

To run the entire platform with **network cables disconnected and zero external API access**:

1. **One-Time Packaging** (while internet is still connected):
   ```bash
   cd backend
   python offline_setup.py
   ```
2. **Sever Internet** (Turn off Wi-Fi / disconnect network cable).
3. **Run the Air-Gapped Runner**:
   ```bash
   cd backend
   chmod +x offline_run.sh
   ./offline_run.sh
   ```
   *This automatically sets `HF_HUB_OFFLINE=1`, installs packages from the local wheelhouse without contacting PyPI, and loads CLIP/ChangeFormer models strictly from `./weights/`.*

---

## 📂 Project Structure

```
terrasphere/
├── backend/                        # Python FastAPI Backend
│   ├── main.py                     # API Routes (/detect-change, /search-semantic, /rag-explain)
│   ├── database.py                 # PostgreSQL / PostGIS Engine
│   ├── models.py                   # SQLAlchemy Geometry Tables
│   ├── services/
│   │   ├── change_detector.py      # Siamese CNN / NDVI / NDBI Pipeline
│   │   ├── vector_search.py        # OpenCLIP + FAISS Vector Index
│   │   ├── rag_engine.py           # OKF Knowledge Base & RAG Synthesis
│   │   └── offline_models.py       # Strict Air-Gapped Local Model Loader
│   ├── offline_setup.py            # Pre-downloads wheels, weights & indexes
│   ├── offline_run.sh              # 100% Offline Runner script
│   ├── docker-compose.yml          # PostGIS + MinIO + FastAPI Docker Stack
│   └── requirements.txt
├── src/                            # React 19 + Tailwind Frontend
│   ├── components/
│   │   ├── Header.tsx              # Top bar, NL queries, and filter controls
│   │   ├── MapViewer.tsx           # High-res satellite view & tactical annotations
│   │   ├── DetectedChangesList.tsx # Categorized change results & confidence scores
│   │   ├── DetailedAnalysis.tsx    # Interactive Before/After split comparison slider
│   │   ├── MetricsTray.tsx         # Time-series, Area trend, Spectral signatures
│   │   ├── LandingPage.tsx         # 9-Layer Architecture Explorer
│   │   └── ReportModal.tsx         # Intelligence dossier export (JSON / Print)
│   ├── data/
│   │   └── mockIntelligenceData.ts # High-fidelity geospatial datasets & imagery
│   └── services/
│       └── apiClient.ts            # Plug-and-play FastAPI bridge
└── package.json
```
=======
# terrasphere-dashboard
>>>>>>> 1cde5a778e31a7509b536482cdc7419725159c46
