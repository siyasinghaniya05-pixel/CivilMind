'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { DashboardOverview } from '@/components/modules/DashboardOverview';
import { PriorityEngine } from '@/components/modules/PriorityEngine';
import { BudgetOptimizer } from '@/components/modules/BudgetOptimizer';
import { WardDevelopmentIndex } from '@/components/modules/WardDevelopmentIndex';
import { RiskPrediction } from '@/components/modules/RiskPrediction';
import { SmartCityMap } from '@/components/modules/SmartCityMap';
import { ProjectMonitoring } from '@/components/modules/ProjectMonitoring';
import { AiRecommendations } from '@/components/modules/AiRecommendations';
import { ImpactAnalytics } from '@/components/modules/ImpactAnalytics';
import { ReportGenerator } from '@/components/modules/ReportGenerator';
import { AdminPanel } from '@/components/modules/AdminPanel';
import { AiAgentsHub } from '@/components/modules/AiAgentsHub';
import { MultiTenantDashboard } from '@/components/modules/MultiTenantDashboard';
import { WhatShouldWeBuildNext } from '@/components/wow/WhatShouldWeBuildNext';
import { BudgetSimulator } from '@/components/wow/BudgetSimulator';
import { DigitalTwinView } from '@/components/wow/DigitalTwinView';
import { CitizenImpactCalculator } from '@/components/wow/CitizenImpactCalculator';
import { AnnualDevelopmentPlan } from '@/components/wow/AnnualDevelopmentPlan';
import { NewProjectModal } from '@/components/modals/NewProjectModal';
import { CitySelectorModal } from '@/components/common/CitySelectorModal';
import { FloatingAiAssistant } from '@/components/common/FloatingAiAssistant';
import { LandingPage } from '@/components/landing/LandingPage';
import { AuthPage } from '@/components/auth/AuthPage';
import { LocationSetupPage } from '@/components/onboarding/LocationSetupPage';

export default function HomePage() {
  const { activeTab, isCityModalOpen, setIsCityModalOpen, currentView } = useCivic();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Page 1: Landing Page
  if (currentView === 'landing') {
    return <LandingPage />;
  }

  // Page 2: Auth Page (Login / Register)
  if (currentView === 'auth') {
    return <AuthPage />;
  }

  // Page 3: Location Setup (Onboarding)
  if (currentView === 'location-setup') {
    return <LocationSetupPage />;
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'insights':
      case 'ai-recommendations':
        return <AiRecommendations />;
      case 'risks':
      case 'risk-prediction':
        return <RiskPrediction />;
      case 'projects':
      case 'project-monitoring':
        return <ProjectMonitoring />;
      case 'budget':
      case 'budget-optimizer':
        return <BudgetOptimizer />;
      case 'reports':
      case 'report-generator':
        return <ReportGenerator />;
      case 'settings':
      case 'admin-panel':
        return <AdminPanel />;
      case 'priority-engine':
        return <PriorityEngine />;
      case 'ward-index':
        return <WardDevelopmentIndex />;
      case 'smart-map':
        return <SmartCityMap />;
      case 'impact-analytics':
        return <ImpactAnalytics />;
      case 'ai-agents-hub':
        return <AiAgentsHub />;
      case 'multi-tenant':
        return <MultiTenantDashboard />;
      case 'wow-build-next':
        return <WhatShouldWeBuildNext />;
      case 'wow-simulator':
        return <BudgetSimulator />;
      case 'wow-digital-twin':
        return <DigitalTwinView />;
      case 'wow-calculator':
        return <CitizenImpactCalculator />;
      case 'wow-adp':
        return <AnnualDevelopmentPlan />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950 transition-colors">
      <Navbar onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {renderActiveModule()}
        </main>
      </div>

      {/* Floating AI Copilot (Perplexity style) */}
      <FloatingAiAssistant />

      {/* New Project Tender Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />

      {/* Pan-India City Discovery & Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />
    </div>
  );
}
