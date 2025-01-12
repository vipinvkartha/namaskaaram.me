import React from 'react';
import { Section } from '../types/sections';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Edit, Trash2 } from 'lucide-react';

interface SectionEditorProps {
  sections: Section[];
  onUpdate: (sections: Section[]) => void;
  onEditSection: (sectionId: string) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ sections, onUpdate, onEditSection }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onUpdate(items);
  };

  const toggleSection = (id: string) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    );
    onUpdate(updatedSections);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Manage Sections</h3>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-2 group"
                    >
                      <input
                        type="checkbox"
                        checked={section.isVisible}
                        onChange={() => toggleSection(section.id)}
                        className="w-4 h-4"
                      />
                      <span className="flex-1 capitalize">{section.type}</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditSection(section.id)}
                          className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}; 