export interface ColorTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Classic Blue',
    colors: {
      primary: '#1a4b8c',
      secondary: '#2d6ccd',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#3b82f6'
    }
  },
  {
    id: 'dark',
    name: 'Modern Dark',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      background: '#111827',
      text: '#f3f4f6',
      accent: '#60a5fa'
    }
  },
  {
    id: 'nature',
    name: 'Forest Green',
    colors: {
      primary: '#065f46',
      secondary: '#047857',
      background: '#f8fafc',
      text: '#1f2937',
      accent: '#10b981'
    }
  }
]; 