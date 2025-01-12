import React from 'react';
import { Template } from '../../templates/types';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: Template['data'];
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{data.title}</p>
            <p className="text-gray-600">{data.bio}</p>
          </div>

          {data.skills && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.projects && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projects</h2>
              <div className="grid gap-6">
                {data.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.socialLinks && (
            <div className="flex justify-center gap-4">
              {data.socialLinks.map((link, index) => {
                const Icon = socialIcons[link.platform as keyof typeof socialIcons];
                return Icon ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 