import { useState, useEffect } from 'react';
import VulnerabilityCard from '../components/VulnerabilityCard';
import { Activity, ShieldCheck, Tag } from 'lucide-react';

// Export dynamically active vulnerabilities for details page routing
export let activeVulnerabilities = [];

const Dashboard = () => {
    const [filter, setFilter] = useState('All');
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
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
            } finally {
                setIsLoading(false);
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
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
                <p>Loading active scan results from backend...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-indigo-400" />
                        Security Dashboard
                    </h1>
                    <p className="text-slate-400">Analysis complete. Below are the detected vulnerabilities.</p>
                </div>

                <div className="flex gap-2">
                    {['All', 'Critical', 'High', 'Medium', 'Low'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setFilter(level)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${filter === level
                                ? 'bg-indigo-500 text-white border-indigo-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Issues</p>
                        <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Critical Severity</p>
                        <p className="text-3xl font-bold text-rose-500">{stats.critical}</p>
                    </div>
                    <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400">
                        <Tag className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">High Severity</p>
                        <p className="text-3xl font-bold text-orange-500">{stats.high}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400">
                        <Tag className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredVulns.length > 0 ? (
                    filteredVulns.map(vuln => <VulnerabilityCard key={vuln.id} vuln={vuln} />)
                ) : (
                    <div className="col-span-full py-16 text-center text-slate-500">
                        No vulnerabilities found for the selected filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
