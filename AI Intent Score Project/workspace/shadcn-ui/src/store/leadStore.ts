import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lead, ScoreResponse } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { scoreLead } from '@/services/api';

interface LeadState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  addLead: (leadData: Omit<Lead, 'id'>) => Promise<void>;
  removeLead: (id: string) => void;
  clearLeads: () => void;
}

export const useLeadStore = create<LeadState>()(
  persist(
    (set, get) => ({
      leads: [],
      loading: false,
      error: null,
      
      addLead: async (leadData: Omit<Lead, 'id'>) => {
        set({ loading: true, error: null });
        try {
          // Generate a unique ID for the lead
          const id = uuidv4();
          
          // Score the lead with the API
          const scoreResult: ScoreResponse = await scoreLead(leadData);
          
          // Create the complete lead object with scores
          const newLead: Lead = {
            ...leadData,
            id,
            initialScore: scoreResult.initialScore,
            rerankedScore: scoreResult.rerankedScore,
          };
          
          // Add the lead to the store
          set(state => ({
            leads: [...state.leads, newLead],
            loading: false
          }));
        } catch (error) {
          console.error('Error adding lead:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            loading: false
          });
        }
      },
      
      removeLead: (id: string) => {
        set(state => ({
          leads: state.leads.filter(lead => lead.id !== id)
        }));
      },
      
      clearLeads: () => {
        set({ leads: [] });
      }
    }),
    {
      name: 'lead-storage', // unique name for localStorage
    }
  )
);