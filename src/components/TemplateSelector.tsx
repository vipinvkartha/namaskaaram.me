import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { templatePresets } from '../templates/presets';
import { Template } from '../templates/types';
import { SignInPrompt } from './SignInPrompt';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
  selectedId: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, selectedId }) => {
  const { isAuthenticated } = useAuth0();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const navigate = useNavigate();

  const handleTemplateClick = (template: Template) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
    } else {
      onSelect(template);
    }
  };

  const handleCustomize = (template: Template) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
    } else {
      navigate('/builder', { state: { template } });
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templatePresets.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg overflow-hidden transition-all hover:border-gray-300 hover:shadow-lg"
          >
            <div className="relative aspect-video">
              <img
                src={template.preview.thumbnail}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {template.layout.charAt(0).toUpperCase() + template.layout.slice(1)} Layout
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTemplateClick(template)}
                  className={`flex-1 py-2 rounded-md ${
                    selectedId === template.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedId === template.id ? 'Selected' : 'Preview'}
                </button>
                <button
                  onClick={() => handleCustomize(template)}
                  className="flex-1 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSignInPrompt && <SignInPrompt />}
    </>
  );
}; 