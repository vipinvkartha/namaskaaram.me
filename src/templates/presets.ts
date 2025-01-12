import { Template } from './types';
import { templatePreviews } from './previews';

export const templatePresets: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    layout: 'minimal',
    preview: {
      image: templatePreviews.minimal.preview,
      thumbnail: templatePreviews.minimal.thumbnail
    },
    data: {
      name: 'John Doe',
      title: 'Software Developer',
      bio: 'Passionate about creating clean, efficient code and building great user experiences.',
      links: [
        {
          type: 'primary',
          url: 'https://github.com',
          label: 'GitHub'
        },
        {
          type: 'primary',
          url: 'https://linkedin.com',
          label: 'LinkedIn'
        }
      ]
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    layout: 'professional',
    preview: {
      image: templatePreviews.professional.preview,
      thumbnail: templatePreviews.professional.thumbnail
    },
    data: {
      name: 'Jane Smith',
      title: 'Full Stack Developer',
      bio: 'Building scalable web applications with modern technologies.',
      links: [
        {
          type: 'primary',
          url: 'https://portfolio.com',
          label: 'Portfolio'
        }
      ],
      socialLinks: [
        {
          platform: 'github',
          url: 'https://github.com'
        },
        {
          platform: 'linkedin',
          url: 'https://linkedin.com'
        },
        {
          platform: 'twitter',
          url: 'https://twitter.com'
        }
      ],
      skills: [
        'React',
        'Node.js',
        'TypeScript',
        'AWS',
        'Docker'
      ],
      projects: [
        {
          title: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce platform using React and Node.js',
          url: 'https://project.com'
        }
      ]
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    layout: 'creative',
    preview: {
      image: templatePreviews.creative.preview,
      thumbnail: templatePreviews.creative.thumbnail
    },
    data: {
      name: 'Alex Johnson',
      title: 'UI/UX Designer & Developer',
      bio: 'Crafting beautiful digital experiences through design and code.',
      links: [
        {
          type: 'primary',
          url: 'https://dribbble.com',
          label: 'Dribbble'
        },
        {
          type: 'primary',
          url: 'https://behance.net',
          label: 'Behance'
        }
      ],
      socialLinks: [
        {
          platform: 'instagram',
          url: 'https://instagram.com'
        },
        {
          platform: 'dribbble',
          url: 'https://dribbble.com'
        }
      ],
      projects: [
        {
          title: 'Brand Redesign',
          description: 'Complete brand identity redesign for a tech startup',
          url: 'https://project.com'
        }
      ]
    }
  }
]; 