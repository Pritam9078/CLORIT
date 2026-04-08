import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  location: string;
  status: 'submitted' | 'ngo-verified' | 'panchayat-reviewed' | 'admin-approved' | 'rejected';
  ndviValue: number;
  area: number;
  carbonCredits: number;
  submissionDate: string;
  ngoName: string;
  ngoId: string;
  isListed?: boolean;
  ownerId?: string; // Current owner of the credits (can be NGO or Corporate)
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'submissionDate'>) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  deleteProject: (id: string) => void;
  listProjectForSale: (id: string, isListed: boolean) => void;
  buyProjectCredits: (projectId: string, buyerId: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [
        {
          id: 'proj-1',
          name: 'Sundarbans Restoration',
          location: 'West Bengal',
          status: 'ngo-verified',
          ndviValue: 0.65,
          area: 45.2,
          carbonCredits: 1250,
          submissionDate: '2024-08-15',
          ngoName: 'Green Earth Foundation',
          ngoId: 'ngo-1'
        },
        {
          id: 'proj-2',
          name: 'Kerala Backwaters',
          location: 'Kerala',
          status: 'panchayat-reviewed',
          ndviValue: 0.72,
          area: 32.7,
          carbonCredits: 980,
          submissionDate: '2024-08-20',
          ngoName: 'Coastal Conservation Trust',
          ngoId: 'ngo-2'
        }
      ],
      addProject: (projectData) => set((state) => ({
        projects: [
          ...state.projects,
          {
            ...projectData,
            id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            submissionDate: new Date().toISOString().split('T')[0],
          }
        ]
      })),
      updateProjectStatus: (id, status) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, status } : p
        )
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),
      listProjectForSale: (id, isListed) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, isListed } : p
        )
      })),
      buyProjectCredits: (projectId, buyerId) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === projectId ? { ...p, ownerId: buyerId, isListed: false } : p
        )
      })),
    }),
    {
      name: 'clorit-project-storage',
    }
  )
);
