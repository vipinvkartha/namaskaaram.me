import React from 'react';
import { Template } from '../templates/types';
import { X } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <img
            src={template.preview.image}
            alt={`${template.name} template preview`}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}; 