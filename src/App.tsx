import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import UserProfile from './components/UserProfile';
import ProjectList from './components/ProjectList';
import ProjectCreationModal from './components/ProjectCreationModal';
import UserManagement from './components/UserManagement';
import TimelinePanel from './components/projects/TimelinePanel';
import ResourcesPanel from './components/projects/ResourcesPanel';
import RisksPanel from './components/projects/RisksPanel';
import CommunicationPanel from './components/projects/CommunicationPanel';
import LanguageSelector from './components/LanguageSelector';
import { useAuth } from './hooks/useAuth';
import { useProjects } from './hooks/useProjects';
import { useComments } from './hooks/useComments';
import { useLanguage } from './hooks/useLanguage';
import { Project, User } from './types/project';
import { Calendar, Users, DollarSign, AlertTriangle, MessageSquare, FolderOpen, Settings } from 'lucide-react';

function App() {
  const { user, login, logout } = useAuth();
  const { 
    projects, 
    createProject, 
    updateProject,
    updatePhase,
    addPhaseAttachment,
    deleteProject,
    updateBudget,
    addRisk,
    updateRisk,
    deleteRisk,
    updateCommunication
  } = useProjects();
  const { comments, addComment, addReply } = useComments();
  const { t } = useLanguage();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'scope' | 'timeline' | 'resources' | 'risks' | 'communication' | 'users'>('scope');
  const [showUserManagement, setShowUserManagement] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <LoginForm onLogin={login} />
      </div>
    );
  }

  // Check if user is admin
  const isAdmin = user.role === 'admin';

  const tabs = [
    { id: 'scope' as const, label: t('nav.projectScope'), icon: FolderOpen },
    { id: 'timeline' as const, label: t('nav.timeline'), icon: Calendar },
    { id: 'resources' as const, label: t('nav.resources'), icon: Users },
    { id: 'risks' as const, label: t('nav.risks'), icon: AlertTriangle },
    { id: 'communication' as const, label: t('nav.communication'), icon: MessageSquare },
  ];

  // Helper functions for comments
  const handleAddComment = (section: string) => (content: string, attachments?: File[]) => {
    addComment(section, content, user, attachments);
  };

  const handleReply = (section: string) => (commentId: string, content: string) => {
    addReply(section, commentId, content, user);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <FolderOpen className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">{t('header.projectManagement')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <UserProfile user={user} onLogout={logout} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showUserManagement && isAdmin ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowUserManagement(false)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  ← Back to Projects
                </button>
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              </div>
            </div>
            <UserManagement currentUser={user} />
          </div>
        ) : !selectedProject ? (
          <ProjectList
            projects={projects}
            currentUser={user}
            onSelectProject={setSelectedProject}
            onCreateProject={createProject}
            onDeleteProject={deleteProject}
            onShowUserManagement={isAdmin ? () => setShowUserManagement(true) : undefined}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  ← {t('header.backToProjects')}
                </button>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'scope' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{t('scope.title')}</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">{t('scope.description')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <TimelinePanel
                    project={selectedProject}
                    currentUser={user}
                    userRole={user.role}
                    comments={comments}
                    onAddComment={handleAddComment}
                    onReply={handleReply}
                    onUpdatePhase={(phaseIndex, updates) => updatePhase(selectedProject.id, phaseIndex, updates)}
                    onAddPhaseAttachment={(phaseIndex, file) => addPhaseAttachment(selectedProject.id, phaseIndex, file)}
                  />
                )}

                {activeTab === 'resources' && (
                  <ResourcesPanel
                    project={selectedProject}
                    currentUser={user}
                    userRole={user.role}
                    comments={comments}
                    onAddComment={handleAddComment}
                    onReply={handleReply}
                    onUpdateBudget={(budget) => updateBudget(selectedProject.id, budget)}
                  />
                )}

                {activeTab === 'risks' && (
                  <RisksPanel
                    project={selectedProject}
                    currentUser={user}
                    userRole={user.role}
                    comments={comments}
                    onAddComment={handleAddComment}
                    onReply={handleReply}
                    onAddRisk={(risk) => addRisk(selectedProject.id, risk)}
                    onUpdateRisk={(riskIndex, risk) => updateRisk(selectedProject.id, riskIndex, risk)}
                    onDeleteRisk={(riskIndex) => deleteRisk(selectedProject.id, riskIndex)}
                  />
                )}

                {activeTab === 'communication' && (
                  <CommunicationPanel
                    project={selectedProject}
                    currentUser={user}
                    userRole={user.role}
                    comments={comments}
                    onAddComment={handleAddComment}
                    onReply={handleReply}
                    onUpdateCommunication={(communication) => updateCommunication(selectedProject.id, communication)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;