import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TemplateEditor } from './components/TemplateEditor';
import { TemplatePreview } from './components/TemplatePreview';
import { defaultTemplate } from './templates/default';

function App() {
  const [template, setTemplate] = useState(defaultTemplate);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your Digital Identity
            </h1>
            <p className="text-lg text-gray-600">
              Build a beautiful personal landing page in minutes
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <TemplateEditor template={template} onUpdate={setTemplate} />
            <TemplatePreview template={template} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;