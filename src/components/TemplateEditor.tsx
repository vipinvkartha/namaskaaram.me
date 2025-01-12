import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Template } from '../templates/types';
import { TemplateSelector } from './TemplateSelector';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { SignInPrompt } from './SignInPrompt';

interface TemplateEditorProps {
  template: Template;
  onUpdate: (template: Template) => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onUpdate }) => {
  const { isAuthenticated } = useAuth0();
  const [activeTab, setActiveTab] = useState<'template' | 'content'>('template');
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleTemplateSelect = (newTemplate: Template) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    onUpdate(newTemplate);
  };

  const handleTabChange = (tab: 'template' | 'content') => {
    if (!isAuthenticated && tab === 'content') {
      setShowSignInPrompt(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'template'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => handleTabChange('template')}
        >
          Choose Template
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'content'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => handleTabChange('content')}
        >
          Edit Content
        </button>
      </div>

      {activeTab === 'template' ? (
        <TemplateSelector onSelect={handleTemplateSelect} selectedId={template.id} />
      ) : (
        <div className="space-y-6">
          {/* Add form fields for editing template content */}
        </div>
      )}

      {showSignInPrompt && <SignInPrompt />}
    </div>
  );
};