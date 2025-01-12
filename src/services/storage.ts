import { BuilderState } from '../types/builder';
import { Section } from '../types/sections';

const STORAGE_KEY = 'template_builder_state';

interface StoredData {
  userId: string;
  builderState: BuilderState;
  sections: Section[];
}

export const storageService = {
  saveState: (userId: string, builderState: BuilderState, sections: Section[]) => {
    try {
      const data: StoredData = { userId, builderState, sections };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  },

  loadState: (userId: string): { builderState: BuilderState; sections: Section[] } | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data: StoredData = JSON.parse(stored);
      if (data.userId !== userId) return null;

      return {
        builderState: data.builderState,
        sections: data.sections
      };
    } catch (error) {
      console.error('Error loading state:', error);
      return null;
    }
  },

  clearState: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
}; 