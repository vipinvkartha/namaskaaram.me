import React from 'react';
import { X, Share2 } from 'lucide-react';
import { ModernLayout } from '../templates/layouts/ModernLayout';
import { ColorTheme } from '../types/theme';
import { Section } from '../types/sections';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ColorTheme;
  sections: Section[];
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    socialLinks: {
      platform: string;
      url: string;
    }[];
  };
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  theme,
  sections,
  personalInfo
}) => {
  // Add keyboard support
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling of the background
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore scrolling
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${personalInfo.name}'s Profile`,
          text: `Check out ${personalInfo.name}'s professional profile`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      // Show a toast notification (you'll need to implement this)
      alert('Link copied to clipboard!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white w-full max-w-6xl rounded-lg shadow-xl relative">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Preview Template</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="h-[80vh] overflow-y-auto">
            <ModernLayout
              theme={theme}
              sections={sections}
              personalInfo={personalInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 