export type ChangeCategory = 'Construction' | 'Road' | 'Forest' | 'Water' | 'Land' | 'Military' | 'Other';

export interface ChangeDetectionItem {
  id: string;
  title: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  coordinates: string;
  lat: number;
  lng: number;
  category: ChangeCategory;
  confidence: number;
  areaChanged: string;
  firstObserved: string;
  distanceToRiver: string;
  nearbyFeatures: string[];
  possibleActivity: string;
  sensor: string;
  resolution: string;
  cloudCover: string;
  beforeImage: string;
  afterImage: string;
  beforeDate: string;
  afterDate: string;
  description: string;
  keyEvidence: string[];
  interpretation: string;
  temporalSnapshots: {
    period: string;
    label: string;
    hasChange: boolean;
    image: string;
  }[];
  spectralSignature: {
    bands: string[];
    beforeValues: number[];
    afterValues: number[];
  };
  timeSeriesTrend: {
    date: string;
    ndvi: number;
    builtIndex: number;
  }[];
  relatedDetections: {
    id: string;
    title: string;
    distance: string;
    category: ChangeCategory;
    image: string;
  }[];
}

export interface FilterState {
  dataSource: string;
  startDate: string;
  endDate: string;
  aoiName: string;
  cloudCover: string;
  sensorType: string;
  resolution: string;
}

export interface TechStackLayer {
  number: number;
  title: string;
  icon: string;
  color: string;
  components: {
    name: string;
    tagline: string;
    description: string;
    pythonOrJsPkg?: string;
  }[];
}
