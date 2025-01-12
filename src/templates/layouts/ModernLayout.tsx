import React from 'react';
import { motion } from 'framer-motion';
import { ColorTheme } from '../../types/theme';
import { Section } from '../../types/sections';
import { 
  FaLinkedin, 
  FaGithub, 
  FaFacebook, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa';

interface ModernLayoutProps {
  theme: ColorTheme;
  sections: Section[];
  personalInfo: PersonalInfo;
}

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location?: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  avatar?: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return <FaLinkedin className="w-6 h-6" />;
    case 'github':
      return <FaGithub className="w-6 h-6" />;
    case 'facebook':
      return <FaFacebook className="w-6 h-6" />;
    case 'instagram':
      return <FaInstagram className="w-6 h-6" />;
    case 'whatsapp':
      return <FaWhatsapp className="w-6 h-6" />;
    default:
      return null;
  }
};

export const ModernLayout: React.FC<ModernLayoutProps> = ({ theme, sections, personalInfo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            backgroundImage: `radial-gradient(${theme.colors.primary} 1px, transparent 1px)`,
            backgroundSize: '50px 50px' 
          }}
        />

        <div className="relative z-10 text-center px-4">
          {personalInfo.avatar && (
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-40 h-40 rounded-full mx-auto border-4 shadow-xl transform hover:scale-105 transition-transform duration-300"
                style={{ borderColor: theme.colors.primary }}
              />
            </motion.div>
          )}
          
          <motion.h1 
            className="text-6xl font-bold mb-4"
            variants={itemVariants}
            style={{ color: theme.colors.primary }}
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.p 
            className="text-2xl mb-6 opacity-90"
            variants={itemVariants}
          >
            {personalInfo.title}
          </motion.p>

          {personalInfo.location && (
            <motion.p 
              className="text-lg opacity-75"
              variants={itemVariants}
            >
              {personalInfo.location}
            </motion.p>
          )}

          {/* Social Links */}
          {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
            <motion.div 
              className="flex justify-center gap-6 mt-8"
              variants={itemVariants}
            >
              {personalInfo.socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: theme.colors.primary }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getSocialIcon(link.platform)}
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div 
            className="w-6 h-10 border-2 rounded-full flex justify-center p-2"
            style={{ borderColor: theme.colors.primary }}
          >
            <div 
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 py-24 space-y-32">
        {sections
          .filter(section => section.isVisible)
          .map(section => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div 
                className="absolute -left-4 top-0 bottom-0 w-1"
                style={{ backgroundColor: theme.colors.primary }}
              />
              
              <h2 
                className="text-3xl font-bold mb-12"
                style={{ color: theme.colors.primary }}
              >
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </h2>

              {/* Section Content */}
              <div className="prose prose-lg max-w-none">
                {renderSectionContent(section, theme)}
              </div>
            </motion.section>
          ))}
      </div>
    </div>
  );
};

function renderSectionContent(section: Section, theme: ColorTheme) {
  switch (section.type) {
    case 'about':
      return (
        <div className="text-lg leading-relaxed">
          {section.content}
        </div>
      );

    case 'experience':
      return (
        <div className="space-y-12">
          {section.content.map((exp: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8"
            >
              <div 
                className="absolute left-0 top-2 w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <h3 className="text-xl font-semibold">{exp.company}</h3>
              <p className="text-lg opacity-75 mb-2">{exp.position}</p>
              <p className="text-sm opacity-60 mb-4">{exp.period}</p>
              <ul className="space-y-2">
                {exp.highlights.map((highlight: string, i: number) => (
                  <li key={i} className="opacity-75">{highlight}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      );

    // Add other section types...

    default:
      return null;
  }
} 