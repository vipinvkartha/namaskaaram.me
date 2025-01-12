import { ColorTheme } from './theme';

export interface BuilderState {
  theme: ColorTheme;
  sections: Section[];
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    socialLinks: {
      platform: string;
      url: string;
    }[];
  };
} 