/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DETECTED_CHANGES } from './data/mockIntelligenceData';
import { ChangeDetectionItem, FilterState } from './types/intelligence';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MapViewer } from './components/MapViewer';
import { DetectedChangesList } from './components/DetectedChangesList';
import { DetailedAnalysis } from './components/DetailedAnalysis';
import { MetricsTray } from './components/MetricsTray';
import { LandingPage } from './components/LandingPage';
import { ReportModal } from './components/ReportModal';
import { FullscreenViewer } from './components/FullscreenViewer';
import { RagAssistantModal } from './components/RagAssistantModal';
import { FastApiBackendGuideModal } from './components/FastApiBackendGuideModal';
import { AnalystLogin, AnalystUser } from './components/AnalystLogin';
import { api } from './services/apiClient';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'techstack'>('dashboard');
  const [currentUser, setCurrentUser] = useState<AnalystUser | null>(() => {
    try {
      const saved = sessionStorage.getItem('terrasphere_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [items, setItems] = useState<ChangeDetectionItem[]>(DETECTED_CHANGES);
  const [selectedItem, setSelectedItem] = useState<ChangeDetectionItem>(DETECTED_CHANGES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('Find new construction near this river between 2023 and 2025');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [sidebarTab, setSidebarTab] = useState<string>('dashboard');

  const [filters, setFilters] = useState<FilterState>({
    dataSource: 'Sentinel-1, Sentinel-2',
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    aoiName: 'Nagpur River Basin (Sector 7)',
    cloudCover: '< 20%',
    sensorType: 'All',
    resolution: 'All'
  });

  // Modal states
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
  const [isRagOpen, setIsRagOpen] = useState<boolean>(false);
  const [isBackendGuideOpen, setIsBackendGuideOpen] = useState<boolean>(false);

  const handleSearch = async (queryText: string) => {
    setIsAnalyzing(true);
    try {
      const results = await api.semanticSearch(queryText);
      setItems(results);
      if (results.length > 0) {
        setSelectedItem(results[0]);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setTimeout(async () => {
      const fetched = await api.fetchChanges(filters);
      setItems(fetched);
      if (fetched.length > 0) {
        setSelectedItem(fetched[0]);
      }
      setIsAnalyzing(false);
    }, 900);
  };

  const handleSelectRelated = (id: string) => {
    const found = DETECTED_CHANGES.find((c) => c.id === id);
    if (found) {
      setSelectedItem(found);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('terrasphere_auth_user');
    setCurrentUser(null);
  };

  // If user switches to Tech Stack / Landing view
  if (activeView === 'techstack') {
    return (
      <>
        <LandingPage
          onLaunchDashboard={() => {
            setActiveView('dashboard');
          }}
          onOpenBackendGuide={() => setIsBackendGuideOpen(true)}
        />
        <FastApiBackendGuideModal
          isOpen={isBackendGuideOpen}
          onClose={() => setIsBackendGuideOpen(false)}
        />
      </>
    );
  }

  // If analyst is not logged in, enforce security access gate
  if (!currentUser) {
    return (
      <>
        <AnalystLogin
          onLoginSuccess={(user) => setCurrentUser(user)}
          onExploreTechStack={() => setActiveView('techstack')}
        />
        <FastApiBackendGuideModal
          isOpen={isBackendGuideOpen}
          onClose={() => setIsBackendGuideOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* 1. Top Global Navigation Header with Query & Filters */}
      <Header
        query={searchQuery}
        setQuery={setSearchQuery}
        onSearch={handleSearch}
        filters={filters}
        setFilters={setFilters}
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenBackendGuide={() => setIsBackendGuideOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Menu & Offline Status */}
        <Sidebar
          activeTab={sidebarTab}
          setActiveTab={(tab) => {
            setSidebarTab(tab);
            if (tab === 'reports') setIsReportOpen(true);
            if (tab === 'rag_assistant') setIsRagOpen(true);
          }}
          onOpenReportModal={() => setIsReportOpen(true)}
          onOpenRagAssistant={() => setIsRagOpen(true)}
        />

        {/* Center Main Stage (Map, Detections, Detailed Analysis, Metrics) */}
        <main className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-108px)]">
          {/* Upper Stage: Map View + Detected Changes List */}
          <div className="flex flex-col lg:flex-row gap-3 min-h-[440px]">
            {/* Interactive Satellite Map Viewport */}
            <MapViewer
              selectedItem={selectedItem}
              detectedItems={items}
              onSelectItem={(item) => setSelectedItem(item)}
              onOpenFullscreen={() => setIsFullscreenOpen(true)}
            />

            {/* Right Panel: Detected Changes List */}
            <DetectedChangesList
              items={items}
              selectedItem={selectedItem}
              onSelectItem={(item) => setSelectedItem(item)}
            />
          </div>

          {/* Middle Stage: Selected Result - Detailed Analysis */}
          <DetailedAnalysis
            item={selectedItem}
            onOpenFullscreen={() => setIsFullscreenOpen(true)}
            onAddToReport={() => setIsReportOpen(true)}
          />

          {/* Lower Stage: Multi-Sensor Analytics Tray */}
          <MetricsTray
            item={selectedItem}
            onSelectRelated={handleSelectRelated}
          />
        </main>
      </div>

      {/* Tactical Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        item={selectedItem}
      />

      <FullscreenViewer
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        item={selectedItem}
      />

      <RagAssistantModal
        isOpen={isRagOpen}
        onClose={() => setIsRagOpen(false)}
        selectedItem={selectedItem}
      />

      <FastApiBackendGuideModal
        isOpen={isBackendGuideOpen}
        onClose={() => setIsBackendGuideOpen(false)}
      />
    </div>
  );
}
