import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { ColorTheme, colorThemes } from '../types/theme';
import { Section } from '../types/sections';
import { ModernLayout } from '../templates/layouts/ModernLayout';
import { SectionEditor } from './SectionEditor';
import { PlusCircle, Eye } from 'lucide-react';
import { SkillsEditor } from './editors/SkillsEditor';
import { ExperienceEditor } from './editors/ExperienceEditor';
import { AboutEditor } from './editors/AboutEditor';
import { PreviewModal } from './PreviewModal';

interface Section {
  id: string;
  type: 'about' | 'contact' | 'experience' | 'education';
  content: any;
}

interface BuilderState {
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

export const TemplateBuilder: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const initialTemplate = location.state?.template;

  const [builderState, setBuilderState] = useState<BuilderState>({
    theme: colorThemes[0],
    sections: [],
    personalInfo: {
      name: '',
      title: '',
      email: '',
      socialLinks: []
    }
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (initialTemplate) {
      // Convert template data to builder state
      setBuilderState({
        theme: colorThemes[0], // Set appropriate theme based on template
        sections: [
          {
            id: 'about',
            type: 'about',
            content: initialTemplate.data.bio
          },
          // Add other sections based on template data
        ],
        personalInfo: {
          name: initialTemplate.data.name,
          title: initialTemplate.data.title,
          email: ''
        }
      });
    }
  }, [initialTemplate]);

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [sections, setSections] = useState([
    {
      id: 'about',
      type: 'about',
      content: '',
      isVisible: true
    },
    {
      id: 'experience',
      type: 'experience',
      content: [],
      isVisible: true
    },
    {
      id: 'skills',
      type: 'skills',
      content: [],
      isVisible: true
    },
    // Add more sections as needed
  ]);

  const handleAddSocialLink = () => {
    setBuilderState({
      ...builderState,
      personalInfo: {
        ...builderState.personalInfo,
        socialLinks: [
          ...(builderState.personalInfo.socialLinks || []),
          { platform: 'linkedin', url: '' }
        ]
      }
    });
  };

  const formatSocialUrl = (platform: string, url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return `https://linkedin.com/in/${url.replace(/^@/, '')}`;
      case 'github':
        return `https://github.com/${url.replace(/^@/, '')}`;
      case 'facebook':
        return `https://facebook.com/${url.replace(/^@/, '')}`;
      case 'instagram':
        return `https://instagram.com/${url.replace(/^@/, '')}`;
      case 'whatsapp':
        return `https://wa.me/${url.replace(/[^0-9]/g, '')}`;
      default:
        return url;
    }
  };

  const handleRemoveSocialLink = (index: number) => {
    const newSocialLinks = [...builderState.personalInfo.socialLinks];
    newSocialLinks.splice(index, 1);
    setBuilderState({
      ...builderState,
      personalInfo: {
        ...builderState.personalInfo,
        socialLinks: newSocialLinks
      }
    });
  };

  const handleEditSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const renderSectionEditor = () => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return null;

    switch (section.type) {
      case 'skills':
        return (
          <SkillsEditor
            skills={section.content || []}
            onUpdate={(newContent) => {
              setSections(sections.map(s =>
                s.id === activeSection ? { ...s, content: newContent } : s
              ));
            }}
          />
        );
      case 'experience':
        return (
          <ExperienceEditor
            experiences={section.content || []}
            onUpdate={(newContent) => {
              setSections(sections.map(s =>
                s.id === activeSection ? { ...s, content: newContent } : s
              ));
            }}
          />
        );
      case 'about':
        return (
          <AboutEditor
            content={section.content || ''}
            onUpdate={(newContent) => {
              setSections(sections.map(s =>
                s.id === activeSection ? { ...s, content: newContent } : s
              ));
            }}
          />
        );
      default:
        return null;
    }
  };

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        {/* Editor Panel */}
        <div className="bg-white border-r border-gray-200 p-6 h-screen overflow-y-auto sticky top-0">
          <div className="space-y-8">
            {/* Preview Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            {/* Theme Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Theme</h2>
              <div className="grid grid-cols-2 gap-3">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setBuilderState({ ...builderState, theme })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      builderState.theme.id === theme.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div
                      className="w-full h-3 rounded mb-2"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div className="text-sm">{theme.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Management */}
            <SectionEditor
              sections={sections}
              onUpdate={setSections}
              onEditSection={handleEditSection}
            />

            {/* Section Content Editor */}
            {activeSection && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium capitalize">
                    Edit {sections.find(s => s.id === activeSection)?.type}
                  </h3>
                  <button
                    onClick={() => setActiveSection(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
                {renderSectionEditor()}
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={builderState.personalInfo.name}
                    onChange={(e) =>
                      setBuilderState({
                        ...builderState,
                        personalInfo: { ...builderState.personalInfo, name: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={builderState.personalInfo.title}
                    onChange={(e) =>
                      setBuilderState({
                        ...builderState,
                        personalInfo: { ...builderState.personalInfo, title: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={builderState.personalInfo.email}
                    onChange={(e) =>
                      setBuilderState({
                        ...builderState,
                        personalInfo: { ...builderState.personalInfo, email: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Social Links</label>
                    <button
                      onClick={handleAddSocialLink}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>
                  
                  {builderState.personalInfo.socialLinks?.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <select
                        value={link.platform}
                        onChange={(e) => {
                          const newSocialLinks = [...builderState.personalInfo.socialLinks];
                          newSocialLinks[index].platform = e.target.value;
                          setBuilderState({
                            ...builderState,
                            personalInfo: {
                              ...builderState.personalInfo,
                              socialLinks: newSocialLinks
                            }
                          });
                        }}
                        className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="linkedin">LinkedIn</option>
                        <option value="github">GitHub</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const newSocialLinks = [...builderState.personalInfo.socialLinks];
                          newSocialLinks[index].url = e.target.value;
                          newSocialLinks[index].url = formatSocialUrl(link.platform, e.target.value);
                          setBuilderState({
                            ...builderState,
                            personalInfo: {
                              ...builderState.personalInfo,
                              socialLinks: newSocialLinks
                            }
                          });
                        }}
                        placeholder={`Enter ${link.platform} ${link.platform === 'whatsapp' ? 'number' : 'username'}`}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleRemoveSocialLink(index)}
                        className="text-red-500 hover:text-red-600 px-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="h-screen overflow-y-auto">
          <ModernLayout
            theme={builderState.theme}
            sections={sections}
            personalInfo={builderState.personalInfo}
          />
        </div>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          theme={builderState.theme}
          sections={sections}
          personalInfo={builderState.personalInfo}
        />
      </div>
    </div>
  );
}; 