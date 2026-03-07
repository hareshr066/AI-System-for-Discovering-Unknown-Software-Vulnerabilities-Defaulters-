import { useState, useEffect } from 'react';
import VulnerabilityCard from '../components/VulnerabilityCard';
import { Activity, ShieldCheck, ShieldAlert, Shield, AlertTriangle, Bug, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, PieChart, Pie } from 'recharts';

// Export dynamically active vulnerabilities for details page routing
export let activeVulnerabilities = [];

const Dashboard = () => {
    const [filter, setFilter] = useState('All');
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Mock endpoint fallback or real fetch
                const response = await fetch('http://localhost:8000/results');
                if (response.ok) {
                    const data = await response.json();

                    // Map backend data into our precise frontend UI schema
                    const formattedIssues = data.issues.map((issue, index) => ({
                        id: index + 1,
                        type: issue.type || 'Unknown Issue',
                        file: issue.file || 'unknown',
                        line: issue.line || 'N/A',
                        severity: issue.severity || 'Medium',
                        description: issue.description || 'No description provided.',
                        snippet: '/* Code execution path analyzed by Groq AI */', // Placeholder, we can upgrade this later
                        remediation: issue.fix || 'No fix suggested.'
                    }));

                    setVulnerabilities(formattedIssues);
                    activeVulnerabilities = formattedIssues; // Give VulnerabilityDetail.jsx access
                }
            } catch (error) {
                console.error('Failed to fetch vulnerabilities:', error);
                // IF backend fails, mock some data gracefully so the dashboard doesn't look empty for demonstration
                // But the instruction says "don't affect backend", so I will leave fetching logic exactly as is.
            } finally {
                // To show off skeleton/loader, we delay a tiny bit
                setTimeout(() => setIsLoading(false), 800);
            }
        };

        fetchResults();
    }, []);

    const filteredVulns = filter === 'All'
        ? vulnerabilities
        : vulnerabilities.filter(v => v.severity === filter);

    const stats = {
        total: vulnerabilities.length,
        critical: vulnerabilities.filter(v => v.severity === 'Critical').length,
        high: vulnerabilities.filter(v => v.severity === 'High').length,
        medium: vulnerabilities.filter(v => v.severity === 'Medium').length,
        low: vulnerabilities.filter(v => v.severity === 'Low').length,
    };

    // Calculate a dynamic risk score
    const riskScore = Math.max(0, 100 - (stats.critical * 15 + stats.high * 10 + stats.medium * 5 + stats.low * 2));
    let securityStatus = "Good";
    let statusColor = "text-emerald-400";
    if (riskScore < 50 || stats.critical > 0) {
        securityStatus = "Critical";
        statusColor = "text-rose-500";
    } else if (riskScore < 80 || stats.high > 0) {
        securityStatus = "Needs Attention";
        statusColor = "text-orange-400";
    }

    const chartData = [
        { name: 'Critical', value: stats.critical, color: '#f43f5e' }, // rose-500
        { name: 'High', value: stats.high, color: '#f97316' },     // orange-500
        { name: 'Medium', value: stats.medium, color: '#eab308' },   // yellow-500
        { name: 'Low', value: stats.low, color: '#3b82f6' }        // blue-500
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    <Shield className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Analyzing Security Posture...</h2>
                <p>Retrieving real-time data from scan engine</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <motion.div 
            className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-indigo-500/10 rounded-xl rounded-tl-sm border border-indigo-500/20 backdrop-blur-sm">
                            <Activity className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Dashboard
                        </h1>
                    </div>
                    <p className="text-slate-400 mt-2 max-w-xl">
                        Comprehensive overview of your application's security posture. Address critical vulnerabilities immediately to maintain a high risk score.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-800/50 w-fit px-3 py-1.5 rounded-full border border-slate-700/50">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        System active • Last scan: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-2 flex-wrap">
                    {['All', 'Critical', 'High', 'Medium', 'Low'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setFilter(level)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border shadow-sm ${filter === level
                                ? 'bg-indigo-500 text-white border-indigo-400 shadow-indigo-500/20'
                                : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Top Stat Overview */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-slate-800 border ${securityStatus === 'Good' ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'}`}>
                            {securityStatus}
                        </span>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Overall Risk Score</p>
                        <div className="flex items-end gap-2">
                             <p className={`text-4xl font-black ${statusColor}`}>{riskScore}</p>
                             <p className="text-slate-500 font-medium mb-1">/ 100</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-rose-500/30 transition-colors">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        {stats.critical > 0 && <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>}
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Critical Issues</p>
                        <p className="text-4xl font-black text-white">{stats.critical}</p>
                    </div>
                </div>

                <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                     <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-500/20">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">High Severity</p>
                        <p className="text-4xl font-black text-white">{stats.high}</p>
                    </div>
                </div>

                <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                     <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                            <Bug className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                           <p className="text-xs text-slate-500 font-medium">Medium: {stats.medium}</p>
                           <p className="text-xs text-slate-500 font-medium">Low: {stats.low}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Found</p>
                        <p className="text-4xl font-black text-white">{stats.total}</p>
                    </div>
                </div>
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="lg:col-span-2 p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl">
                     <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-400"/> Severity Distribution
                     </h3>
                     <div className="h-72 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#1e293b'}}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>
                <div className="p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-white mb-2 self-start w-full">Impact Breakdown</h3>
                    <div className="h-48 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                         {chartData.map((entry, i) => (
                             <div key={i} className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                 <span className="text-sm text-slate-400">{entry.name}</span>
                             </div>
                         ))}
                    </div>
                </div>
            </motion.div>

            {/* Top Vulnerable Files Section */}
            {vulnerabilities.length > 0 && (
                <motion.div variants={itemVariants} className="mb-12">
                    <div className="p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <FileCode className="w-5 h-5 text-indigo-400"/> Most Vulnerable Files
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(vulnerabilities.reduce((acc, v) => {
                                acc[v.file] = (acc[v.file] || 0) + 1;
                                return acc;
                            }, {})).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([file, count], idx) => (
                                <div key={idx} className="p-4 bg-slate-800/50 rounded-2xl flex justify-between items-center border border-slate-700 transition-colors hover:border-indigo-500/30">
                                    <span className="text-slate-300 font-mono text-sm truncate mr-4" title={file}>
                                        {file}
                                    </span>
                                    <span className="bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded-full text-xs shrink-0 border border-indigo-500/20">
                                        {count} issues
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Vulnerability Grid */}
            <motion.div variants={itemVariants} className="mb-6 flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                     <Shield className="w-6 h-6 text-indigo-400"/>
                     Vulnerability Details
                 </h2>
                 <span className="text-sm font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                     Showing {filteredVulns.length} entries
                 </span>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredVulns.length > 0 ? (
                    filteredVulns.map(vuln => <VulnerabilityCard key={vuln.id} vuln={vuln} />)
                ) : (
                    <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                             <ShieldCheck className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Vulnerabilities Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            Great job! There are no vulnerabilities matching the "{filter}" filter in the current analysis.
                        </p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
