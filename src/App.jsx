import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Scan from './pages/Scan';
import Dashboard from './pages/Dashboard';
import VulnerabilityDetail from './pages/VulnerabilityDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-16 -mt-16">
        <Navbar />
        <main className="flex-1 overflow-x-hidden p-6 md:p-8 relative">
          {/* Subtle background effects */}
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vulnerability/:id" element={<VulnerabilityDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
