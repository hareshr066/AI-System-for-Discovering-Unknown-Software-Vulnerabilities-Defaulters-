import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, ShieldAlert, Crosshair, Zap, 
  Activity, AlertTriangle, Radio, Network,
  Terminal, Radar, Target, Eye
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const threatData = [
  { time: '00:00', attacks: 1200, mitigated: 1100 },
  { time: '04:00', attacks: 2100, mitigated: 1900 },
  { time: '08:00', attacks: 1800, mitigated: 1750 },
  { time: '12:00', attacks: 3400, mitigated: 3200 },
  { time: '16:00', attacks: 4500, mitigated: 4300 },
  { time: '20:00', attacks: 2800, mitigated: 2700 },
  { time: '24:00', attacks: 1500, mitigated: 1450 }
];

const liveThreats = [
  { id: 1, type: 'DDoS Attack', source: 'Botnet Alpha', target: 'US East Region', severity: 'Critical', time: 'Just now' },
  { id: 2, type: 'Ransomware', source: 'Unknown APT', target: 'Financial Sector', severity: 'High', time: '2 mins ago' },
  { id: 3, type: 'Zero-day Exploit', source: 'Suspicious IP', target: 'Web Servers', severity: 'Critical', time: '5 mins ago' },
  { id: 4, type: 'Phishing Campaign', source: 'Malicious Domain', target: 'Internal Staff', severity: 'Medium', time: '12 mins ago' },
  { id: 5, type: 'Brute Force', source: 'Proxy Network', target: 'Auth Endpoints', severity: 'Low', time: '18 mins ago' }
];

const knownActors = [
  { name: 'APT29 (Cozy Bear)', origin: 'Russia', activity: 'High', targets: 'Government' },
  { name: 'Lazarus Group', origin: 'North Korea', activity: 'Critical', targets: 'Financial' },
  { name: 'Equation Group', origin: 'Unknown', activity: 'Low', targets: 'Telecom' },
  { name: 'Sandworm', origin: 'Russia', activity: 'High', targets: 'Infrastructure' }
];

const getSeverityTheme = (severity) => {
  switch (severity) {
    case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
    case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
    default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
  }
};

const getSeverityGlow = (severity) => {
  switch (severity) {
    case 'Critical': return 'shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    case 'High': return 'shadow-[0_0_15px_rgba(249,115,22,0.5)]';
    case 'Medium': return 'shadow-[0_0_15px_rgba(234,179,8,0.5)]';
    case 'Low': return 'shadow-[0_0_15px_rgba(34,197,94,0.5)]';
    default: return '';
  }
};

const Card = ({ children, className = '', delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
    {children}
  </motion.div>
);

const ThreatIntelligence = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Radio className="w-8 h-8 text-indigo-500 animate-pulse" />
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Threat Intelligence
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Real-time global threat monitoring, malicious actor tracking, and attack vector analysis.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-lg px-4 py-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-slate-300 font-medium text-sm">Live Monitoring Active</span>
        </div>
      </motion.div>
      
      <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 via-purple-500/20 to-transparent mb-8"></div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card delay={0.1} className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <Activity className="w-5 h-5 text-red-500/50" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Critical Threats Blocked</h3>
          <div className="text-3xl font-bold text-red-500 mt-1">1,204</div>
          <p className="text-xs text-red-400/80 mt-2 font-medium">+15% from yesterday</p>
        </Card>

        <Card delay={0.2} className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Globe className="w-6 h-6" />
            </div>
            <Radar className="w-5 h-5 text-indigo-500/50" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Global Network Scans</h3>
          <div className="text-3xl font-bold text-white mt-1">84.2M</div>
          <p className="text-xs text-emerald-400 mt-2 font-medium bg-emerald-500/10 inline-block px-2 py-0.5 rounded-sm">Normal Traffic</p>
        </Card>

        <Card delay={0.3} className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <Target className="w-6 h-6" />
            </div>
            <Crosshair className="w-5 h-5 text-purple-500/50" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Active Threat Actors</h3>
          <div className="text-3xl font-bold text-white mt-1">47</div>
          <p className="text-xs text-slate-500 mt-2">Currently tracked by AI</p>
        </Card>

        <Card delay={0.4} className="hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <Terminal className="w-5 h-5 text-emerald-500/50" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Zero-Days Identified</h3>
          <div className="text-3xl font-bold text-white mt-1">3</div>
          <p className="text-xs text-emerald-500 mt-2 border-l-2 border-emerald-500 pl-2">All remediated</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Radar Map Visual */}
        <Card delay={0.5} className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-semibold text-white mb-8 self-start w-full flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-indigo-400" />
            Global Threat Radar
          </h2>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-indigo-500/20 flex items-center justify-center overflow-hidden bg-slate-900/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <div className="absolute inset-0 border border-indigo-500/10 rounded-full scale-[0.75]"></div>
            <div className="absolute inset-0 border border-indigo-500/20 rounded-full scale-50"></div>
            <div className="absolute inset-0 border border-indigo-500/30 rounded-full scale-25"></div>
            
            {/* Crosshairs */}
            <div className="absolute inset-0 w-full h-px bg-indigo-500/20 top-1/2 -translate-y-1/2"></div>
            <div className="absolute inset-0 h-full w-px bg-indigo-500/20 left-1/2 -translate-x-1/2"></div>

            {/* Sweeping Radar gradient */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 w-1/2 h-1/2 origin-bottom-right"
              style={{ 
                background: 'conic-gradient(from 90deg, transparent 0deg, rgba(99, 102, 241, 0.4) 90deg)',
                borderRight: '2px solid rgba(129, 140, 248, 1)'
              }}
            />
            
            {/* Blips */}
            <motion.div 
              animate={{ opacity: [0, 1, 0, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.3, 1] }} 
              className="absolute w-2 h-2 bg-red-500 rounded-full top-[25%] left-[30%] shadow-[0_0_10px_red]" 
            />
            <motion.div 
              animate={{ opacity: [0, 0, 1, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.6, 1] }} 
              className="absolute w-2 h-2 bg-yellow-400 rounded-full bottom-[35%] right-[20%] shadow-[0_0_10px_yellow]" 
            />
            <motion.div 
              animate={{ opacity: [0, 0, 0, 1, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.8, 0.9, 1] }} 
              className="absolute w-2 h-2 bg-orange-500 rounded-full top-[60%] left-[65%] shadow-[0_0_10px_orange]" 
            />
            
            <Globe className="w-8 h-8 text-indigo-500/40 absolute" />
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-400"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]"></span> Critical Outbreak</div>
            <div className="flex items-center gap-2 text-slate-400"><span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_yellow]"></span> Suspicious Node</div>
          </div>
        </Card>

        {/* Live Threat Feed */}
        <Card delay={0.6} className="lg:col-span-2 flex flex-col h-full max-h-[480px]">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              Live Threat Feed
            </span>
            <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">Updating real-time</span>
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {liveThreats.map((threat, index) => (
              <motion.div 
                key={threat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                className={`bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/60 transition-colors ${
                  threat.severity === 'Critical' ? 'border-l-4 border-l-red-500' : 
                  threat.severity === 'High' ? 'border-l-4 border-l-orange-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-3 w-3 rounded-full ${getSeverityGlow(threat.severity)} ${
                      threat.severity === 'Critical' ? 'bg-red-500' : 
                      threat.severity === 'High' ? 'bg-orange-500' : 
                      threat.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{threat.type}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getSeverityTheme(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </div>
                    <div className="flex items-center text-sm font-mono text-slate-400 gap-2">
                      <span className="text-indigo-400">{threat.source}</span>
                      <span>→</span>
                      <span>{threat.target}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 whitespace-nowrap self-start sm:self-auto font-mono">
                  {threat.time}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Volume Chart */}
        <Card delay={0.8}>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            24h Attack Volume
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMitigated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAttacks)" name="Attack Attempts" />
                <Area type="monotone" dataKey="mitigated" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorMitigated)" name="Mitigated" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Known Threat Actors Table */}
        <Card delay={0.9} className="overflow-hidden">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            Known Threat Actors Tracker
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Group Name</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Origin</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Activity Level</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Prime Targets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {knownActors.map((actor, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 text-slate-200 font-medium flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      {actor.name}
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-sm">{actor.origin}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase border ${
                        actor.activity === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/30' : 
                        actor.activity === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' : 
                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                      }`}>
                        {actor.activity}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 text-sm">{actor.targets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// MapIcon workaround since map is a JS reserved keyword and Map might clash or not exist depending on lucide version used
const MapIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
    <line x1="9" y1="3" x2="9" y2="18"></line>
    <line x1="15" y1="6" x2="15" y2="21"></line>
  </svg>
);

export default ThreatIntelligence;
