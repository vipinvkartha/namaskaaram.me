import React from 'react';

interface AboutEditorProps {
  content: string;
  onUpdate: (content: string) => void;
}

export const AboutEditor: React.FC<AboutEditorProps> = ({ content, onUpdate }) => {
  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Write something about yourself..."
        className="w-full h-48 p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <p className="text-sm text-gray-500">
        Tip: Write a brief introduction about yourself, your passion, and what you do.
      </p>
    </div>
  );
}; 