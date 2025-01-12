import React from 'react';
import { Template } from '../../templates/types';

interface MinimalTemplateProps {
  data: Template['data'];
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{data.title}</p>
        <p className="text-gray-600 mb-8">{data.bio}</p>
        <div className="flex justify-center gap-4">
          {data.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}; 