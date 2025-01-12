export interface Template {
  id: string;
  name: string;
  layout: 'minimal' | 'professional' | 'creative';
  preview: {
    image: string;
    thumbnail: string;
  };
  data: {
    name: string;
    title: string;
    bio: string;
    links: {
      type: string;
      url: string;
      label: string;
    }[];
    socialLinks?: {
      platform: string;
      url: string;
    }[];
    skills?: string[];
    projects?: {
      title: string;
      description: string;
      url?: string;
    }[];
  };
} 