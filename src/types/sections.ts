export interface Section {
  id: string;
  type: 'about' | 'experience' | 'skills' | 'education' | 'projects' | 'contact';
  content: any;
  isVisible: boolean;
} 