import React from 'react';
import { Template } from '../types';
import { Globe, Mail, MapPin } from 'lucide-react';

interface TemplatePreviewProps {
  template: Template;
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={template.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={template.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      
      <div className="pt-20 pb-8 px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{template.name || 'Your Name'}</h2>
        
        {template.location && (
          <div className="flex items-center justify-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{template.location}</span>
          </div>
        )}
        
        <p className="mt-4 text-gray-600">
          {template.bio || 'Tell your story here...'}
        </p>
        
        <div className="mt-6 space-y-3">
          {template.website && (
            <a
              href={template.website}
              className="flex items-center justify-center text-gray-600 hover:text-indigo-600"
            >
              <Globe className="h-4 w-4 mr-2" />
              {template.website}
            </a>
          )}
          
          {template.email && (
            <a
              href={`mailto:${template.email}`}
              className="flex items-center justify-center text-gray-600 hover:text-indigo-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              {template.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}