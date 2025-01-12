import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { Pricing } from './components/Pricing';
import { TemplateBuilder } from './components/TemplateBuilder';
import { LandingPage } from './components/LandingPage';

function App() {
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
          <Route path="/builder" element={<TemplateBuilder />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;