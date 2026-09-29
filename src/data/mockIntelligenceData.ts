import { ChangeDetectionItem, TechStackLayer } from '../types/intelligence';

export const MAIN_SATELLITE_AOI_IMAGE = '/src/assets/images/satellite_river_aoi_main_1790681333674.jpg';
export const BEFORE_SITE_IMAGE = '/src/assets/images/satellite_before_site_1790681347995.jpg';
export const AFTER_SITE_IMAGE = '/src/assets/images/satellite_after_site_1790681362431.jpg';
export const ROAD_DEV_IMAGE = '/src/assets/images/satellite_road_dev_1790681380243.jpg';

export const DETECTED_CHANGES: ChangeDetectionItem[] = [
  {
    id: 'chg-01',
    title: 'New Construction',
    dateRange: '2023-06-14 → 2025-06-18',
    startDate: '2023-06-14',
    endDate: '2025-06-18',
    coordinates: '21.1456° N, 79.0883° E',
    lat: 21.1456,
    lng: 79.0883,
    category: 'Construction',
    confidence: 0.92,
    areaChanged: '2.4 hectares',
    firstObserved: 'Between 2024-12 and 2025-03',
    distanceToRiver: '320 meters',
    nearbyFeatures: ['Road', 'Open Land', 'River'],
    possibleActivity: 'Building Construction',
    sensor: 'Sentinel-2 (Optical)',
    resolution: '10 meters',
    cloudCover: '< 10% (Good Quality)',
    beforeDate: '2023-06-14',
    afterDate: '2025-06-18',
    beforeImage: BEFORE_SITE_IMAGE,
    afterImage: AFTER_SITE_IMAGE,
    description:
      'Based on multi-temporal satellite imagery and metadata analysis, a new construction activity has been detected in the selected area between December 2024 and March 2025. The change is clearly visible in high-resolution Sentinel-2 imagery, showing the emergence of multiple rectangular structures.',
    keyEvidence: [
      'No structures in 2023-06 image',
      'Visible construction in 2025-06 image',
      'Consistent change across multiple dates',
      'Located near river (320 meters)',
      'Area ~ 2.4 hectares',
      'High confidence (0.92) after cloud/shadow filtering'
    ],
    interpretation:
      'Likely new building construction. Requires analyst verification for exact nature and purpose.',
    temporalSnapshots: [
      { period: '2023-01', label: '2023-01', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2023-06', label: '2023-06', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2023-12', label: '2023-12', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2024-06', label: '2024-06', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2024-12', label: '2024-12', hasChange: true, image: AFTER_SITE_IMAGE },
      { period: '2025-06', label: '2025-06', hasChange: true, image: AFTER_SITE_IMAGE },
      { period: '2025-12', label: '2025-12', hasChange: true, image: AFTER_SITE_IMAGE }
    ],
    spectralSignature: {
      bands: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
      beforeValues: [0.12, 0.14, 0.22, 0.15, 0.28, 0.48, 0.54, 0.58, 0.52, 0.31, 0.18],
      afterValues: [0.18, 0.22, 0.25, 0.29, 0.31, 0.35, 0.38, 0.40, 0.39, 0.48, 0.42]
    },
    timeSeriesTrend: [
      { date: '2023-01', ndvi: 0.62, builtIndex: 0.11 },
      { date: '2023-06', ndvi: 0.68, builtIndex: 0.12 },
      { date: '2023-12', ndvi: 0.59, builtIndex: 0.14 },
      { date: '2024-06', ndvi: 0.64, builtIndex: 0.19 },
      { date: '2024-12', ndvi: 0.41, builtIndex: 0.48 },
      { date: '2025-06', ndvi: 0.24, builtIndex: 0.79 },
      { date: '2025-12', ndvi: 0.21, builtIndex: 0.83 }
    ],
    relatedDetections: [
      {
        id: 'rel-01',
        title: 'Similar Construction',
        distance: '2.1 km away',
        category: 'Construction',
        image: AFTER_SITE_IMAGE
      },
      {
        id: 'rel-02',
        title: 'Road Development',
        distance: '3.4 km away',
        category: 'Road',
        image: ROAD_DEV_IMAGE
      },
      {
        id: 'rel-03',
        title: 'Land Change',
        distance: '5.6 km away',
        category: 'Land',
        image: MAIN_SATELLITE_AOI_IMAGE
      }
    ]
  },
  {
    id: 'chg-02',
    title: 'Road Development',
    dateRange: '2023-03-12 → 2025-05-20',
    startDate: '2023-03-12',
    endDate: '2025-05-20',
    coordinates: '21.1321° N, 79.1024° E',
    lat: 21.1321,
    lng: 79.1024,
    category: 'Road',
    confidence: 0.87,
    areaChanged: '1.8 hectares',
    firstObserved: 'Between 2024-04 and 2024-09',
    distanceToRiver: '180 meters',
    nearbyFeatures: ['Vegetation', 'River bank', 'Transport Corridor'],
    possibleActivity: 'Paved Access Road & Culvert',
    sensor: 'Sentinel-2 (Optical)',
    resolution: '10 meters',
    cloudCover: '< 8% (Good Quality)',
    beforeDate: '2023-03-12',
    afterDate: '2025-05-20',
    beforeImage: BEFORE_SITE_IMAGE,
    afterImage: ROAD_DEV_IMAGE,
    description:
      'Linear clearance and graded road corridor observed connecting rural arterial bypass directly to newly excavated river staging sector.',
    keyEvidence: [
      'Linear high-reflectance spectral trace',
      'Vegetation buffer cleared along 1.4 km corridor',
      'Direct culvert grading over tributary'
    ],
    interpretation: 'Heavy logistics access corridor or bypass road construction.',
    temporalSnapshots: [
      { period: '2023-01', label: '2023-01', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2023-06', label: '2023-06', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2024-06', label: '2024-06', hasChange: true, image: ROAD_DEV_IMAGE },
      { period: '2025-06', label: '2025-06', hasChange: true, image: ROAD_DEV_IMAGE }
    ],
    spectralSignature: {
      bands: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
      beforeValues: [0.11, 0.13, 0.20, 0.14, 0.32, 0.50, 0.56, 0.60, 0.55, 0.28, 0.15],
      afterValues: [0.19, 0.24, 0.28, 0.33, 0.35, 0.37, 0.39, 0.41, 0.40, 0.52, 0.46]
    },
    timeSeriesTrend: [
      { date: '2023-01', ndvi: 0.65, builtIndex: 0.08 },
      { date: '2024-01', ndvi: 0.58, builtIndex: 0.22 },
      { date: '2025-01', ndvi: 0.22, builtIndex: 0.76 }
    ],
    relatedDetections: [
      {
        id: 'rel-01',
        title: 'New Construction',
        distance: '1.2 km away',
        category: 'Construction',
        image: AFTER_SITE_IMAGE
      }
    ]
  },
  {
    id: 'chg-03',
    title: 'Vegetation Loss',
    dateRange: '2023-02-10 → 2025-04-15',
    startDate: '2023-02-10',
    endDate: '2025-04-15',
    coordinates: '21.1183° N, 79.0956° E',
    lat: 21.1183,
    lng: 79.0956,
    category: 'Forest',
    confidence: 0.81,
    areaChanged: '3.1 hectares',
    firstObserved: '2024-08',
    distanceToRiver: '490 meters',
    nearbyFeatures: ['Forest Canopy', 'Agricultural Margin'],
    possibleActivity: 'Deforestation & Land Clearing',
    sensor: 'Sentinel-2 (Optical) + Sentinel-1 (SAR)',
    resolution: '10 meters',
    cloudCover: '< 5% (Optimal)',
    beforeDate: '2023-02-10',
    afterDate: '2025-04-15',
    beforeImage: BEFORE_SITE_IMAGE,
    afterImage: MAIN_SATELLITE_AOI_IMAGE,
    description:
      'Substantial drop in NDVI index across 3.1 hectares of dense tree cover, revealing bare subsoil and vehicle staging tracks.',
    keyEvidence: [
      'NDVI dropped from 0.74 to 0.18',
      'SAR backscatter change confirming loss of volumetric canopy reflection'
    ],
    interpretation: 'Commercial forestry clearance or preparation for industrial compound.',
    temporalSnapshots: [
      { period: '2023-01', label: '2023-01', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2025-06', label: '2025-06', hasChange: true, image: MAIN_SATELLITE_AOI_IMAGE }
    ],
    spectralSignature: {
      bands: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
      beforeValues: [0.08, 0.10, 0.18, 0.11, 0.35, 0.58, 0.65, 0.70, 0.63, 0.22, 0.12],
      afterValues: [0.15, 0.19, 0.23, 0.27, 0.29, 0.31, 0.33, 0.35, 0.34, 0.44, 0.38]
    },
    timeSeriesTrend: [
      { date: '2023-01', ndvi: 0.74, builtIndex: 0.05 },
      { date: '2025-01', ndvi: 0.18, builtIndex: 0.38 }
    ],
    relatedDetections: []
  },
  {
    id: 'chg-04',
    title: 'Water Body Change',
    dateRange: '2023-01-18 → 2024-12-11',
    startDate: '2023-01-18',
    endDate: '2024-12-11',
    coordinates: '21.1054° N, 79.0762° E',
    lat: 21.1054,
    lng: 79.0762,
    category: 'Water',
    confidence: 0.78,
    areaChanged: '1.2 hectares',
    firstObserved: '2024-03',
    distanceToRiver: '0 meters (Direct)',
    nearbyFeatures: ['River Meander', 'Sandbars'],
    possibleActivity: 'River Meander Sedimentation & Embankment',
    sensor: 'Sentinel-1 (SAR) & Landsat-9',
    resolution: '15 meters',
    cloudCover: '< 15%',
    beforeDate: '2023-01-18',
    afterDate: '2024-12-11',
    beforeImage: BEFORE_SITE_IMAGE,
    afterImage: MAIN_SATELLITE_AOI_IMAGE,
    description:
      'Shifting river boundary and newly consolidated sandbar embankment restricting natural flood bypass channel.',
    keyEvidence: [
      'MNDWI water index contraction',
      'Permanent embankment structure visible in dry season'
    ],
    interpretation: 'Civil drainage works or artificial diversion of water course.',
    temporalSnapshots: [
      { period: '2023-01', label: '2023-01', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2024-12', label: '2024-12', hasChange: true, image: MAIN_SATELLITE_AOI_IMAGE }
    ],
    spectralSignature: {
      bands: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
      beforeValues: [0.18, 0.15, 0.14, 0.09, 0.05, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01],
      afterValues: [0.16, 0.18, 0.22, 0.24, 0.26, 0.28, 0.30, 0.32, 0.31, 0.36, 0.30]
    },
    timeSeriesTrend: [
      { date: '2023-01', ndvi: 0.12, builtIndex: 0.02 },
      { date: '2024-12', ndvi: 0.19, builtIndex: 0.18 }
    ],
    relatedDetections: []
  },
  {
    id: 'chg-05',
    title: 'New Structures',
    dateRange: '2023-07-22 → 2025-05-10',
    startDate: '2023-07-22',
    endDate: '2025-05-10',
    coordinates: '21.1520° N, 79.1091° E',
    lat: 21.152,
    lng: 79.1091,
    category: 'Construction',
    confidence: 0.76,
    areaChanged: '0.9 hectares',
    firstObserved: '2025-01',
    distanceToRiver: '610 meters',
    nearbyFeatures: ['Rail Siding', 'Warehousing Sector'],
    possibleActivity: 'Secondary Outpost Foundations',
    sensor: 'Sentinel-2 (Optical)',
    resolution: '10 meters',
    cloudCover: '< 10%',
    beforeDate: '2023-07-22',
    afterDate: '2025-05-10',
    beforeImage: BEFORE_SITE_IMAGE,
    afterImage: AFTER_SITE_IMAGE,
    description:
      'Two discrete modular structures established north of the rail spur with perimeter trenching.',
    keyEvidence: [
      'High albedo roofing materials detected',
      'Right-angle geometric shadow signatures'
    ],
    interpretation: 'Ancillary logistics shed or communications relay building.',
    temporalSnapshots: [
      { period: '2023-01', label: '2023-01', hasChange: false, image: BEFORE_SITE_IMAGE },
      { period: '2025-06', label: '2025-06', hasChange: true, image: AFTER_SITE_IMAGE }
    ],
    spectralSignature: {
      bands: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12'],
      beforeValues: [0.12, 0.14, 0.21, 0.16, 0.27, 0.44, 0.51, 0.55, 0.50, 0.32, 0.19],
      afterValues: [0.17, 0.20, 0.24, 0.28, 0.30, 0.34, 0.37, 0.39, 0.38, 0.45, 0.40]
    },
    timeSeriesTrend: [
      { date: '2023-01', ndvi: 0.60, builtIndex: 0.15 },
      { date: '2025-06', ndvi: 0.31, builtIndex: 0.68 }
    ],
    relatedDetections: []
  }
];

export const EXAMPLE_QUERIES = [
  'New road construction',
  'Deforestation',
  'River change',
  'New buildings',
  'Military infrastructure'
];

export const TECH_STACK_LAYERS: TechStackLayer[] = [
  {
    number: 1,
    title: 'Frontend',
    icon: 'Monitor',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    components: [
      {
        name: 'React.js',
        tagline: 'Component State & Micro-Interactions',
        description: 'React 19 single-page dashboard with fast state synchronization, responsive sidebars, split-screen comparison tools, and offline telemetry.',
        pythonOrJsPkg: 'react@19, typescript, tailwindcss'
      },
      {
        name: 'Leaflet',
        tagline: 'High-Performance Tile Engine',
        description: 'Interactive geospatial viewport rendering STAC / GeoTIFF tile overlays, bounding boxes, vector polygons, and locator insets with zero latency.',
        pythonOrJsPkg: 'leaflet@1.9, @types/leaflet'
      }
    ]
  },
  {
    number: 2,
    title: 'Backend',
    icon: 'Server',
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-400',
    components: [
      {
        name: 'Python',
        tagline: 'Scientific Computing & Pipeline Core',
        description: 'Async execution engine orchestrating GDAL spatial tasks, deep learning inferences, and STAC indexing.',
        pythonOrJsPkg: 'python >= 3.10'
      },
      {
        name: 'FastAPI',
        tagline: 'Asynchronous High-Throughput REST API',
        description: 'Microservice endpoints with OpenAPI schemas for `/api/v1/detect-change`, `/api/v1/search-semantic`, and streaming RAG responses.',
        pythonOrJsPkg: 'fastapi, uvicorn[standard], pydantic'
      }
    ]
  },
  {
    number: 3,
    title: 'AI / Semantic Search',
    icon: 'Brain',
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-400',
    components: [
      {
        name: 'PyTorch',
        tagline: 'Deep Learning Foundation',
        description: 'GPU-accelerated tensor operations powering Siamese architectures and cross-modal embedding projectors.',
        pythonOrJsPkg: 'torch, torchvision'
      },
      {
        name: 'Transformers',
        tagline: 'Vision & Language Encoders',
        description: 'Hugging Face vision transformers (ViT) and text tokenizers for cross-domain intelligence matching.',
        pythonOrJsPkg: 'transformers, accelerate'
      },
      {
        name: 'CLIP',
        tagline: 'Cross-Modal Image-Text Embeddings',
        description: 'Aligns natural language queries (e.g. "Find new construction near this river") with satellite visual features in shared latent space.',
        pythonOrJsPkg: 'open_clip_torch'
      },
      {
        name: 'FAISS',
        tagline: 'Dense Vector Similarity Index',
        description: 'Sub-millisecond similarity search over millions of satellite patch vectors partitioned with HNSW / IVF-PQ indexing.',
        pythonOrJsPkg: 'faiss-cpu / faiss-gpu'
      }
    ]
  },
  {
    number: 4,
    title: 'Change Detection',
    icon: 'TrendingUp',
    color: 'from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-400',
    components: [
      {
        name: 'Siamese CNN',
        tagline: 'Bi-Temporal Difference Modeling',
        description: 'Twin weight-sharing convolutional backbones calculating feature distance metrics between $T_0$ and $T_1$ satellite passes.',
        pythonOrJsPkg: 'torch.nn (SiameseResNet / ChangeFormer)'
      },
      {
        name: 'Transformers',
        tagline: 'ChangeFormer Attention Blocks',
        description: 'Spatial-temporal cross-attention layers isolating human infrastructure shifts from natural seasonal vegetation flux.',
        pythonOrJsPkg: 'timm, einops'
      },
      {
        name: 'OpenCV',
        tagline: 'Morphology & Spatial Filtering',
        description: 'Contour extraction, connected component analysis, noise reduction, and polygonization of binary change masks.',
        pythonOrJsPkg: 'opencv-python-headless'
      }
    ]
  },
  {
    number: 5,
    title: 'Geospatial Processing',
    icon: 'Globe',
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-400',
    components: [
      {
        name: 'GDAL',
        tagline: 'Geospatial Data Abstraction Library',
        description: 'Reprojection (EPSG:4326 to UTM), warping, tiling, and radiometric calibration of raw satellite swaths.',
        pythonOrJsPkg: 'osgeo.gdal'
      },
      {
        name: 'Rasterio',
        tagline: 'Numpy-Compatible Raster I/O',
        description: 'Windowed reads of Cloud-Optimized GeoTIFFs (COG), multi-band indexing, and spectral reflectance calculations.',
        pythonOrJsPkg: 'rasterio'
      },
      {
        name: 'GeoPandas',
        tagline: 'Spatial Dataframes & Operations',
        description: 'Vector attribute queries, spatial joins, buffer computations (e.g. "within 500m of river"), and GeoJSON generation.',
        pythonOrJsPkg: 'geopandas'
      },
      {
        name: 'Shapely',
        tagline: 'Geometric Manipulation & Analysis',
        description: 'Polygon intersection, simplification, convex hulls, and planar distance metrics for detected change clusters.',
        pythonOrJsPkg: 'shapely'
      }
    ]
  },
  {
    number: 6,
    title: 'Database & Knowledge',
    icon: 'Database',
    color: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/40 text-cyan-400',
    components: [
      {
        name: 'PostgreSQL',
        tagline: 'Relational Intelligence Registry',
        description: 'Stores analysts, missions, audit logs, metadata tags, and detection histories with ACID guarantees.',
        pythonOrJsPkg: 'postgresql >= 15'
      },
      {
        name: 'PostGIS',
        tagline: 'Spatial Database Extension',
        description: 'High-performance spatial indexing (R-Tree / GiST), ST_DWithin queries, boundary intersections, and coordinate transforms.',
        pythonOrJsPkg: 'postgis >= 3.3, geoalchemy2'
      },
      {
        name: 'OKF',
        tagline: 'Ontology / Knowledge Framework',
        description: 'Hierarchical military doctrine and remote sensing domain knowledge linking physical objects to strategic definitions.',
        pythonOrJsPkg: 'rdflib, owlready2'
      }
    ]
  },
  {
    number: 7,
    title: 'Satellite Data & Standards',
    icon: 'Satellite',
    color: 'from-blue-600/20 to-indigo-600/10 border-blue-500/40 text-blue-300',
    components: [
      {
        name: 'Sentinel-1 (SAR)',
        tagline: 'Synthetic Aperture Radar (All-Weather)',
        description: 'C-band SAR imagery penetrating clouds and nighttime darkness for structural radar backscatter change verification.',
        pythonOrJsPkg: 'Copernicus Hub / Sentinelsat'
      },
      {
        name: 'Sentinel-2 (Optical)',
        tagline: '13-Band Multispectral Constellation',
        description: '10m RGB and Red-Edge bands for accurate vegetation indices (NDVI) and built-up index (NDBI) tracking.',
        pythonOrJsPkg: 'ESA Copernicus Open Access'
      },
      {
        name: 'Landsat 8/9',
        tagline: 'Decadal Multi-Decade Archives',
        description: 'Thermal infrared and historical baselines spanning up to 30 years of geographic context.',
        pythonOrJsPkg: 'USGS EarthExplorer'
      },
      {
        name: 'Bhuvan (ISRO datasets)',
        tagline: 'National Remote Sensing Centre (NRSC)',
        description: 'High-resolution Indian regional datasets, Cartosat DEMs, and Resourcesat thematic layers.',
        pythonOrJsPkg: 'ISRO Bhuvan OGC Services'
      },
      {
        name: 'STAC',
        tagline: 'SpatioTemporal Asset Catalog',
        description: 'Standardized JSON metadata API for querying imagery across dates, clouds, and bounding boxes.',
        pythonOrJsPkg: 'pystac, pystac-client'
      },
      {
        name: 'GeoTIFF / COG',
        tagline: 'Cloud-Optimized GeoTIFF',
        description: 'HTTP range requests allowing on-demand streaming of zoom pyramids without loading multi-gigabyte rasters.',
        pythonOrJsPkg: 'rio-cogeo, titiler'
      }
    ]
  },
  {
    number: 8,
    title: 'RAG & Explanation',
    icon: 'FileSearch',
    color: 'from-violet-500/20 to-fuchsia-500/10 border-violet-500/40 text-violet-400',
    components: [
      {
        name: 'RAG Pipeline',
        tagline: 'Retrieval-Augmented Generation',
        description: 'Retrieves relevant spatial context, temporal change metrics, OKF doctrinal rules, and historical base records to generate verifiable briefings.',
        pythonOrJsPkg: 'langchain / llama-index'
      },
      {
        name: 'Local LLM',
        tagline: 'Air-Gapped Sovereign Intelligence',
        description: 'Quantized on-premises models (Llama 3 / Mistral / DeepSeek) running offline with zero data leakage to external networks.',
        pythonOrJsPkg: 'vLLM, Ollama, llama.cpp'
      }
    ]
  },
  {
    number: 9,
    title: 'Deployment & Execution',
    icon: 'Cloud',
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/40 text-sky-400',
    components: [
      {
        name: 'Docker',
        tagline: 'Containerized Microservices',
        description: 'Reproducible multi-stage container builds packaging GDAL binaries, PyTorch CUDA runtimes, and web services.',
        pythonOrJsPkg: 'docker-compose.yml'
      },
      {
        name: 'Local Model Server',
        tagline: 'High-Throughput Inference Runtime',
        description: 'Triton or TorchServe managing concurrent batched tensor inputs across connected GPU nodes.',
        pythonOrJsPkg: 'Triton Inference Server'
      },
      {
        name: 'Local CPU / GPU',
        tagline: 'NVIDIA TensorRT / CUDA Acceleration',
        description: 'Dedicated edge compute clusters enabling real-time raster convolution and vector scoring.',
        pythonOrJsPkg: 'CUDA 12+, cuDNN'
      },
      {
        name: 'Local Storage',
        tagline: 'High-IOPS NVMe RAID Cache',
        description: 'Local S3-compatible MinIO object store and fast block storage for multi-terabyte satellite tiles.',
        pythonOrJsPkg: 'MinIO / Ceph'
      }
    ]
  }
];
