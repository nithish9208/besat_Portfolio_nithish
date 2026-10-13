import React, { useState, useEffect } from 'react';
import { NavTab, ProjectId } from './types/portfolio';
import { PROJECTS_METADATA } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewDashboard } from './components/OverviewDashboard';
import { AboutSection } from './components/AboutSection';
import { ProjectsIndex } from './components/ProjectsIndex';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { MonsoonSimulator } from './components/simulators/MonsoonSimulator';
import { UrbanSimulator } from './components/simulators/UrbanSimulator';
import { CareerSimulator } from './components/simulators/CareerSimulator';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null);
  const [activeSimulatorId, setActiveSimulatorId] = useState<ProjectId | null>(null);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProjectId, activeSimulatorId]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    setSelectedProjectId(null);
    setActiveSimulatorId(null);
  };

  const handleSelectProject = (projectId: ProjectId) => {
    setSelectedProjectId(projectId);
    setActiveSimulatorId(null);
  };

  const handleLaunchSimulator = (projectId: ProjectId) => {
    setSelectedProjectId(projectId);
    setActiveSimulatorId(projectId);
  };

  const handleBackFromProject = () => {
    setSelectedProjectId(null);
    setActiveSimulatorId(null);
    setActiveTab('projects');
  };

  const handleToggleTheme = () => {
    setIsLightMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isLightMode 
        ? 'bg-slate-50 text-slate-900' 
        : 'bg-[#0a0f1d] text-slate-100'
    }`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        onQuickLaunchSim={handleLaunchSimulator}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* If user is drilling into a specific project detail */}
        {selectedProjectId ? (
          <ProjectDetailPage
            project={PROJECTS_METADATA[selectedProjectId]}
            onBack={handleBackFromProject}
            onOpenSimulator={handleLaunchSimulator}
          />
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewDashboard
                onNavigate={handleTabChange}
                onSelectProject={handleSelectProject}
              />
            )}

            {activeTab === 'about' && (
              <AboutSection />
            )}

            {activeTab === 'projects' && (
              <ProjectsIndex
                onSelectProject={handleSelectProject}
                onLaunchSimulator={handleLaunchSimulator}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSection />
            )}

            {activeTab === 'experience' && (
              <ExperienceSection />
            )}

            {activeTab === 'contact' && (
              <ContactSection />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
