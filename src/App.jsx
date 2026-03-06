import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Scan from './pages/Scan';
import Dashboard from './pages/Dashboard';
import VulnerabilityDetail from './pages/VulnerabilityDetail';

import LiveScanMonitor from './pages/LiveScanMonitor';
import VulnerabilityExplorer from './pages/VulnerabilityExplorer';
import ThreatIntelligence from './pages/ThreatIntelligence';
import ScanHistory from './pages/ScanHistory';
import SecurityReports from './pages/SecurityReports';
import AiInsights from './pages/AiInsights';
import TeamCollaboration from './pages/TeamCollaboration';
import SystemSettings from './pages/SystemSettings';

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-200">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-6 md:p-8 relative overflow-y-auto">
          {/* Subtle background effects */}
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none transform translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 w-full mx-auto min-h-full flex flex-col">
            <div className="flex-1">
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vulnerability/:id" element={<VulnerabilityDetail />} />
              
              {/* New Sidebar Routes */}
              <Route path="/live-monitor" element={<LiveScanMonitor />} />
              <Route path="/vulnerabilities" element={<VulnerabilityExplorer />} />
              <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
              <Route path="/history" element={<ScanHistory />} />
              <Route path="/reports" element={<SecurityReports />} />
              <Route path="/insights" element={<AiInsights />} />
              <Route path="/collaboration" element={<TeamCollaboration />} />
              <Route path="/settings" element={<SystemSettings />} />
              </Routes>
            </div>
            <Footer className="mt-auto" />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
