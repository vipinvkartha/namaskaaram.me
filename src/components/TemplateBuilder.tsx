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
import { storageService } from '../services/storage';

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
  const { isAuthenticated, isLoading, user } = useAuth0();
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
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  // Load saved state when component mounts
  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      const savedState = storageService.loadState(user.sub);
      if (savedState) {
        setBuilderState(savedState.builderState);
        setSections(savedState.sections);
      } else if (initialTemplate) {
        // If no saved state but has initial template
        setBuilderState({
          theme: colorThemes[0],
          sections: [],
          personalInfo: {
            name: initialTemplate.data.name,
            title: initialTemplate.data.title,
            email: '',
            socialLinks: []
          }
        });
        setSections([
          {
            id: 'about',
            type: 'about',
            content: initialTemplate.data.bio,
            isVisible: true
          },
          // ... other sections
        ]);
      }
    }
  }, [isAuthenticated, user?.sub, initialTemplate]);

  // Save state whenever it changes
  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      setIsSaving(true);
      const saveTimeout = setTimeout(() => {
        storageService.saveState(user.sub, builderState, sections);
        setIsSaving(false);
      }, 500); // Debounce saves

      return () => clearTimeout(saveTimeout);
    }
  }, [isAuthenticated, user?.sub, builderState, sections]);

  // Clear saved state on logout
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      storageService.clearState();
    }
  }, [isAuthenticated, isLoading]);

  // Wrap state setters to ensure they trigger the save effect
  const updateBuilderState = (newState: BuilderState) => {
    setBuilderState(newState);
  };

  const updateSections = (newSections: Section[]) => {
    setSections(newSections);
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleAddSocialLink = () => {
    updateBuilderState({
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
    updateBuilderState({
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
              updateSections(sections.map(s =>
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
              updateSections(sections.map(s =>
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
              updateSections(sections.map(s =>
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
          <div className="absolute top-4 right-4">
            {isSaving && (
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            )}
          </div>

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
                    onClick={() => updateBuilderState({ ...builderState, theme })}
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
              onUpdate={updateSections}
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
                      updateBuilderState({
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
                      updateBuilderState({
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
                      updateBuilderState({
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
                          updateBuilderState({
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
                          updateBuilderState({
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