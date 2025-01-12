import React from 'react';
import { motion } from 'framer-motion';
import { templatePresets } from '../templates/presets';
import { TemplateSelector } from './TemplateSelector';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export const LandingPage = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Beautiful Templates',
      description: 'Choose from our collection of professionally designed templates'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Quick Setup',
      description: 'Get your personal landing page up and running in minutes'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure & Reliable',
      description: 'Your data is safe and your page is always available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Create Your Digital Identity
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Build a professional landing page that showcases your work and personality.
              Choose from our beautiful templates and customize them to match your style.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform -skew-y-6"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Template
            </h2>
            <p className="text-lg text-gray-600">
              Start with one of our professionally designed templates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TemplateSelector onSelect={() => {}} selectedId="" />
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your Landing Page?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of professionals who trust us with their online presence
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 