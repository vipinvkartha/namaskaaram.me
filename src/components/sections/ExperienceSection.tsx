import React from 'react';

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
  theme: any;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onUpdate,
  theme
}) => {
  const addExperience = () => {
    onUpdate([
      ...experiences,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: theme.colors.primary }}
      >
        Work Experience
      </h2>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => {
              const newExperiences = [...experiences];
              newExperiences[index] = { ...exp, company: e.target.value };
              onUpdate(newExperiences);
            }}
            className="block w-full mb-2 p-2 border rounded"
          />
          {/* Add other fields similarly */}
        </div>
      ))}
      <button
        onClick={addExperience}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Experience
      </button>
    </div>
  );
}; 