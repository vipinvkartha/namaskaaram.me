import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { Pricing } from './components/Pricing';
import { TemplateEditor } from './components/TemplateEditor';
import { TemplatePreview } from './components/TemplatePreview';
import { defaultTemplate } from './templates/default';
import { useState } from 'react';

function App() {
  const [template, setTemplate] = useState(defaultTemplate);
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;