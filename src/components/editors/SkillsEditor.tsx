import React from 'react';
import { PlusCircle, Star, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillsEditorProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onUpdate }) => {
  const handleAddSkill = () => {
    onUpdate([...skills, { name: '', level: 3 }]);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    onUpdate(newSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Skills</h4>
        <button
          onClick={handleAddSkill}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <AnimatePresence>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group flex gap-3 items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
          >
            <input
              type="text"
              value={skill.name}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[index].name = e.target.value;
                onUpdate(newSkills);
              }}
              placeholder="e.g., React, TypeScript, UI Design"
              className="flex-1 border-none focus:ring-0 text-gray-900 placeholder-gray-400"
            />
            
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    const newSkills = [...skills];
                    newSkills[index].level = level;
                    onUpdate(newSkills);
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    level <= skill.level
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleRemoveSkill(index)}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-all"
              title="Remove skill"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {skills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <p>No skills added yet.</p>
          <button
            onClick={handleAddSkill}
            className="mt-2 text-blue-600 hover:text-blue-700"
          >
            Add your first skill
          </button>
        </motion.div>
      )}
    </div>
  );
}; 