import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, AlertTriangle, FileCode, ShieldCheck, 
  Download, FileJson, FileText, Database, Lock,
  Shield, User
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const vulnerabilityData = [
  { name: 'Critical', value: 5, color: '#ef4444' }, // red
  { name: 'High', value: 9, color: '#f97316' }, // orange
  { name: 'Medium', value: 12, color: '#eab308' }, // yellow
  { name: 'Low', value: 8, color: '#22c55e' } // green
];

const vulnerabilitiesList = [
  { id: 1, name: 'SQL Injection', severity: 'Critical', file: 'auth/login.js', line: 42, fix: 'Use parameterized queries' },
  { id: 2, name: 'Cross-Site Scripting', severity: 'High', file: 'profile.jsx', line: 18, fix: 'Sanitize user input' },
  { id: 3, name: 'Hardcoded API Key', severity: 'Medium', file: 'config.py', line: 7, fix: 'Move to environment variables' },
  { id: 4, name: 'Open Redirect', severity: 'Low', file: 'redirect.js', line: 12, fix: 'Validate redirect URLs' },
];

const aiRecommendations = [
  { id: 1, text: 'Implement prepared statements to prevent SQL injection', icon: Database },
  { id: 2, text: 'Sanitize and validate all user inputs', icon: Shield },
  { id: 3, text: 'Remove sensitive credentials from source code', icon: Lock },
  { id: 4, text: 'Implement secure authentication practices', icon: User },
];

const vulnerableModules = [
  { name: 'Authentication Module', issues: 8 },
  { name: 'Payment API', issues: 6 },
  { name: 'User Profile', issues: 4 },
  { name: 'Admin Panel', issues: 3 },
];

const getSeverityStyles = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'Low': return 'bg-green-500/10 text-green-500 border-green-500/20';
    default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};

const Card = ({ children, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 ${className}`}
  >
    {children}
  </motion.div>
);

const SecurityReports = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* Page Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Security Reports
        </h1>
        <p className="text-slate-400 text-lg">
          Comprehensive security analysis of scanned projects with AI-generated insights and remediation guidance.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent mt-6"></div>
      </motion.div>

      {/* SECTION 1 - Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Vulnerabilities</h3>
          <div className="text-3xl font-bold text-white mt-1">34</div>
          <p className="text-xs text-slate-500 mt-2">Across all scanned repositories</p>
        </Card>

        <Card className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Critical Issues</h3>
          <div className="text-3xl font-bold text-red-500 mt-1">5</div>
          <p className="text-xs text-slate-500 mt-2">Requires immediate attention</p>
        </Card>

        <Card className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <FileCode className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Files Scanned</h3>
          <div className="text-3xl font-bold text-white mt-1">128</div>
          <p className="text-xs text-slate-500 mt-2">In the latest scanning cycle</p>
        </Card>

        <Card className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Security Score</h3>
          <div className="text-3xl font-bold text-white mt-1">72<span className="text-lg text-slate-500 font-normal">/100</span></div>
          <p className="text-xs text-slate-500 mt-2">Based on current metrics</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* SECTION 2 - Vulnerability Breakdown Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-6">Vulnerability Severity Distribution</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vulnerabilityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {vulnerabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* SECTION 5 - Most Vulnerable Modules */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-6">Most Vulnerable Modules</h2>
          <div className="space-y-5">
            {vulnerableModules.map((module, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">{module.name}</span>
                  <span className="text-slate-400 text-sm">{module.issues} issues</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(module.issues / 10) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                    className={`h-2 rounded-full ${
                      module.issues >= 8 ? 'bg-red-500' : 
                      module.issues >= 5 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* SECTION 3 - Vulnerability Report Table */}
      <Card className="mb-8 overflow-hidden">
        <h2 className="text-xl font-semibold text-white mb-6">Detected Vulnerabilities</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Vulnerability</th>
                <th className="py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">File Location</th>
                <th className="py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Line Number</th>
                <th className="py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Recommended Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {vulnerabilitiesList.map((vuln) => (
                <tr key={vuln.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 text-slate-200 font-medium">{vuln.name}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getSeverityStyles(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono text-sm">{vuln.file}</td>
                  <td className="py-4 px-4 text-slate-400">{vuln.line}</td>
                  <td className="py-4 px-4 text-slate-300">{vuln.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 4 - AI Fix Recommendations */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-6">AI-Powered Remediation Suggestions</h2>
          <div className="space-y-4">
            {aiRecommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <div key={rec.id} className="flex items-start p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors group">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">{rec.text}</p>
                    <p className="text-slate-500 text-sm mt-1">Generated by NexusScan AI</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* SECTION 6 - Report Export */}
        <Card className="flex flex-col h-full">
          <h2 className="text-xl font-semibold text-white mb-6">Export Security Report</h2>
          <p className="text-slate-400 mb-6 flex-1">
            Download the comprehensive security analysis report in your preferred format for documentation or sharing with your team.
          </p>
          <div className="space-y-3 mt-auto">
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all font-medium group">
              <FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download PDF</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 transition-all font-medium group">
              <FileJson className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download JSON</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 transition-all font-medium group">
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download CSV</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityReports;
