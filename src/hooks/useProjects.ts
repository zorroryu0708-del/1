import { useState, useEffect } from 'react';
import { Project, Phase, Risk, Budget, Communication } from '../types/project';
import { User } from '../types/user';

// Mock project data
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Smart Home IoT Platform',
    budget: {
      personnelCosts: 150000,
      technologyTools: 25000,
      marketingLaunch: 30000,
      contingency: 20000
    },
    phases: [
      {
        name: 'Research & Planning',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        duration: '4 weeks',
        content: 'Market research, user interviews, and technical feasibility analysis',
        attachments: [],
        reviewers: []
      },
      {
        name: 'Design & Prototyping',
        startDate: '2024-02-16',
        endDate: '2024-04-15',
        duration: '8 weeks',
        content: 'UI/UX design, system architecture, and prototype development',
        attachments: [],
        reviewers: []
      },
      {
        name: 'Development',
        startDate: '2024-04-16',
        endDate: '2024-08-15',
        duration: '17 weeks',
        content: 'Full-scale development of the IoT platform and mobile applications',
        attachments: [],
        reviewers: []
      },
      {
        name: 'Testing & QA',
        startDate: '2024-08-16',
        endDate: '2024-10-15',
        duration: '8 weeks',
        content: 'Comprehensive testing, quality assurance, and bug fixes',
        attachments: [],
        reviewers: []
      },
      {
        name: 'Launch & Deployment',
        startDate: '2024-10-16',
        endDate: '2024-11-30',
        duration: '6 weeks',
        content: 'Production deployment, marketing campaign, and user onboarding',
        attachments: [],
        reviewers: []
      }
    ],
    risks: [
      {
        category: 'Technical',
        description: 'Integration challenges with third-party IoT devices',
        impact: 'High',
        probability: 'Medium',
        mitigation: 'Establish partnerships with key device manufacturers and create comprehensive API documentation'
      },
      {
        category: 'Market',
        description: 'Competitive pressure from established players',
        impact: 'Medium',
        probability: 'High',
        mitigation: 'Focus on unique features and superior user experience to differentiate from competitors'
      }
    ],
    teamMembers: [
      {
        role: 'Product Manager',
        responsibilities: ['Project oversight', 'Stakeholder communication', 'Requirements gathering'],
        allocation: '100%'
      },
      {
        role: 'Lead Developer',
        responsibilities: ['Technical architecture', 'Code review', 'Team coordination'],
        allocation: '100%'
      },
      {
        role: 'UI/UX Designer',
        responsibilities: ['User interface design', 'User experience optimization', 'Design system'],
        allocation: '80%'
      },
      {
        role: 'QA Engineer',
        responsibilities: ['Test planning', 'Quality assurance', 'Bug tracking'],
        allocation: '60%'
      }
    ],
    communication: {
      meetings: [
        {
          title: 'Daily Standup',
          schedule: 'Daily 9:00-9:15 AM',
          audience: 'Development Team',
          content: 'Daily progress updates, blockers discussion, and task coordination'
        },
        {
          title: 'Sprint Planning',
          schedule: 'Bi-weekly Mondays 10:00-12:00 PM',
          audience: 'Full Team',
          content: 'Sprint goal setting, task estimation, and backlog prioritization'
        },
        {
          title: 'Stakeholder Review',
          schedule: 'Monthly Last Friday 2:00-3:00 PM',
          audience: 'Stakeholders & Leadership',
          content: 'Project progress review, milestone updates, and strategic decisions'
        }
      ],
      stakeholders: ['CEO', 'CTO', 'Head of Product', 'Marketing Director', 'Customer Success Manager']
    }
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const createProject = (name: string, createdBy: User): Project => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      budget: {
        personnelCosts: 0,
        technologyTools: 0,
        marketingLaunch: 0,
        contingency: 0
      },
      phases: [
        {
          name: 'Planning Phase',
          startDate: '',
          endDate: '',
          duration: '2 weeks',
          content: 'Initial project planning and requirement gathering',
          attachments: [],
          reviewers: []
        },
        {
          name: 'Design Phase',
          startDate: '',
          endDate: '',
          duration: '3 weeks',
          content: 'System design and architecture planning',
          attachments: [],
          reviewers: []
        },
        {
          name: 'Development Phase',
          startDate: '',
          endDate: '',
          duration: '8 weeks',
          content: 'Core development and implementation',
          attachments: [],
          reviewers: []
        },
        {
          name: 'Testing Phase',
          startDate: '',
          endDate: '',
          duration: '2 weeks',
          content: 'Quality assurance and testing',
          attachments: [],
          reviewers: []
        },
        {
          name: 'Deployment Phase',
          startDate: '',
          endDate: '',
          duration: '1 week',
          content: 'Production deployment and launch',
          attachments: [],
          reviewers: []
        }
      ],
      risks: [],
      teamMembers: [
        {
          role: 'Project Manager',
          responsibilities: ['Project coordination', 'Timeline management'],
          allocation: '100%'
        },
        {
          role: 'Developer',
          responsibilities: ['Code development', 'Technical implementation'],
          allocation: '100%'
        }
      ],
      communication: {
        meetings: [
          {
            title: 'Project Kickoff',
            schedule: 'Week 1 - Monday 10:00 AM',
            audience: 'All Team Members',
            content: 'Project introduction, goals overview, and team introductions'
          }
        ],
        stakeholders: ['Project Sponsor', 'Team Lead']
      }
    };

    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
  };

  const updatePhase = (projectId: string, phaseIndex: number, updates: Partial<Phase>) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedPhases = [...project.phases];
        updatedPhases[phaseIndex] = { ...updatedPhases[phaseIndex], ...updates };
        return { ...project, phases: updatedPhases };
      }
      return project;
    }));
  };

  const addPhaseAttachment = (projectId: string, phaseIndex: number, file: File) => {
    const attachment = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    };

    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedPhases = [...project.phases];
        updatedPhases[phaseIndex] = {
          ...updatedPhases[phaseIndex],
          attachments: [...updatedPhases[phaseIndex].attachments, attachment]
        };
        return { ...project, phases: updatedPhases };
      }
      return project;
    }));
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const updateBudget = (projectId: string, budget: Budget) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, budget } : project
    ));
  };

  const addRisk = (projectId: string, risk: Risk) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, risks: [...project.risks, risk] }
        : project
    ));
  };

  const updateRisk = (projectId: string, riskIndex: number, risk: Risk) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedRisks = [...project.risks];
        updatedRisks[riskIndex] = risk;
        return { ...project, risks: updatedRisks };
      }
      return project;
    }));
  };

  const deleteRisk = (projectId: string, riskIndex: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedRisks = project.risks.filter((_, index) => index !== riskIndex);
        return { ...project, risks: updatedRisks };
      }
      return project;
    }));
  };

  const updateCommunication = (projectId: string, communication: Communication) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, communication } : project
    ));
  };

  return {
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
  };
}