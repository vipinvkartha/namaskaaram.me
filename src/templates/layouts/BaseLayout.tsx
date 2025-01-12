import React from 'react';
import { ColorTheme } from '../../types/theme';
import { Section } from '../../types/sections';

interface BaseLayoutProps {
  theme: ColorTheme;
  sections: Section[];
  personalInfo: PersonalInfo;
}

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location?: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  avatar?: string;
}

interface Section {
  id: string;
  type: 'about' | 'experience' | 'skills' | 'education' | 'projects' | 'contact';
  content: any;
  isVisible: boolean;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ theme, sections, personalInfo }) => {
  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="text-center">
          {personalInfo.avatar && (
            <div className="mb-6">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full mx-auto border-4"
                style={{ borderColor: theme.colors.primary }}
              />
            </div>
          )}
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: theme.colors.primary }}
          >
            {personalInfo.name}
          </h1>
          <p className="text-xl mb-4">{personalInfo.title}</p>
          {personalInfo.location && (
            <p className="text-sm opacity-75">{personalInfo.location}</p>
          )}
        </header>

        {/* Render Visible Sections */}
        {sections
          .filter(section => section.isVisible)
          .map(section => (
            <section 
              key={section.id}
              className="bg-opacity-10 rounded-lg p-8"
              style={{ backgroundColor: theme.colors.secondary }}
            >
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.primary }}
              >
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </h2>
              
              {/* Render Section Content Based on Type */}
              {section.type === 'about' && (
                <div className="prose max-w-none">
                  <p>{section.content}</p>
                </div>
              )}

              {section.type === 'experience' && (
                <div className="space-y-8">
                  {section.content.map((exp: any, index: number) => (
                    <div key={index} className="border-l-2 pl-4" style={{ borderColor: theme.colors.accent }}>
                      <h3 className="font-semibold">{exp.company}</h3>
                      <p className="text-sm opacity-75">{exp.position}</p>
                      <p className="text-sm opacity-75">{exp.period}</p>
                      <ul className="mt-2 list-disc list-inside">
                        {exp.highlights.map((highlight: string, i: number) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {section.content.map((skill: any, index: number) => (
                    <div 
                      key={index}
                      className="p-3 rounded"
                      style={{ backgroundColor: `${theme.colors.primary}20` }}
                    >
                      <p className="font-medium">{skill.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${skill.level * 20}%`,
                            backgroundColor: theme.colors.accent
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add other section types as needed */}
            </section>
          ))}
      </div>
    </div>
  );
}; 