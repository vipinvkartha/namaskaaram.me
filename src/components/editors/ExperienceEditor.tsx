import React from 'react';
import { PlusCircle, GripVertical, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  company: string;
  position: string;
  period: string;
  highlights: string[];
}

interface ExperienceEditorProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ experiences, onUpdate }) => {
  const handleAddExperience = () => {
    onUpdate([...experiences, {
      company: '',
      position: '',
      period: '',
      highlights: ['']
    }]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    onUpdate(newExperiences);
  };

  const handleAddHighlight = (experienceIndex: number) => {
    const newExperiences = [...experiences];
    newExperiences[experienceIndex].highlights.push('');
    onUpdate(newExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Work Experience</h4>
        <button
          onClick={handleAddExperience}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <AnimatePresence>
        {experiences.map((exp, expIndex) => (
          <motion.div
            key={expIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group relative space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition-all"
          >
            {/* Header with drag handle and remove button */}
            <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
              <button
                onClick={() => handleRemoveExperience(expIndex)}
                className="p-1 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                title="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Experience Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[expIndex].company = e.target.value;
                    onUpdate(newExperiences);
                  }}
                  placeholder="e.g., Acme Corp"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[expIndex].position = e.target.value;
                    onUpdate(newExperiences);
                  }}
                  placeholder="e.g., Senior Developer"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <input
                type="text"
                value={exp.period}
                onChange={(e) => {
                  const newExperiences = [...experiences];
                  newExperiences[expIndex].period = e.target.value;
                  onUpdate(newExperiences);
                }}
                placeholder="e.g., Jan 2020 - Present"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Highlights Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Highlights & Achievements</label>
                <button
                  onClick={() => handleAddHighlight(expIndex)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              
              <AnimatePresence>
                {exp.highlights.map((highlight, highlightIndex) => (
                  <motion.div
                    key={highlightIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-2 group/highlight"
                  >
                    <div className="flex-none pt-2.5 opacity-50">•</div>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[expIndex].highlights[highlightIndex] = e.target.value;
                        onUpdate(newExperiences);
                      }}
                      placeholder="Describe your achievement or responsibility"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        const newExperiences = [...experiences];
                        newExperiences[expIndex].highlights.splice(highlightIndex, 1);
                        onUpdate(newExperiences);
                      }}
                      className="opacity-0 group-hover/highlight:opacity-100 p-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-all"
                      title="Remove highlight"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <p>No experiences added yet.</p>
          <button
            onClick={handleAddExperience}
            className="mt-2 text-blue-600 hover:text-blue-700"
          >
            Add your first experience
          </button>
        </motion.div>
      )}
    </div>
  );
}; 