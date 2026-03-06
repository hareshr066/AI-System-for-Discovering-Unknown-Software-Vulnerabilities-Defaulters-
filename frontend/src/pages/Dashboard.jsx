import { useState } from 'react';
import VulnerabilityCard from '../components/VulnerabilityCard';
import { Activity, ShieldCheck, Tag } from 'lucide-react';
import HoverTrail from '../components/HoverTrail';

// Dummy data
export const dummyVulnerabilities = [
    {
        id: 1,
        type: "Buffer Overflow",
        file: "login.c",
        line: 42,
        severity: "Critical",
        description: "Unsafe input handling using gets() which can lead to arbitrary code execution.",
        snippet: "void loginUser() {\n  char username[50];\n  printf(\"Enter username: \");\n  gets(username); // VULNERABILITY: Use fgets instead\n  // ...\n}",
        remediation: "Replace gets() with fgets() to enforce length limits."
    },
    {
        id: 2,
        type: "SQL Injection",
        file: "auth.py",
        line: 115,
        severity: "High",
        description: "User input concatenated directly into SQL query string without proper parameterization.",
        snippet: "def get_user_data(username):\n    query = f\"SELECT * FROM users WHERE username = '{username}'\"\n    # VULNERABILITY: Unescaped interpolation\n    cursor.execute(query)",
        remediation: "Use parameterized queries or prepared statements provided by your DB driver."
    },
    {
        id: 3,
        type: "Cross-Site Scripting (XSS)",
        file: "Profile.jsx",
        line: 28,
        severity: "Medium",
        description: "Rendering unsanitized user profile biography directly into the DOM using dangerouslySetInnerHTML.",
        snippet: "const UserBio = ({ bio }) => {\n  // VULNERABILITY: No sanitization of 'bio' string\n  return <div dangerouslySetInnerHTML={{ __html: bio }} />;\n}",
        remediation: "Sanitize HTML using a library like DOMPurify before rendering it."
    },
    {
        id: 4,
        type: "Insecure Direct Object Reference",
        file: "api/routes.js",
        line: 55,
        severity: "High",
        description: "Fetching user documents using an unpredictable sequence ID from request without authorizing the user owns the record.",
        snippet: "app.get('/api/docs/:docId', (req, res) => {\n  const id = req.params.docId;\n  // VULNERABILITY: Missing ownership check\n  db.collection('docs').findOne({ _id: id });\n});",
        remediation: "Verify that the authenticated user's ID matches the owner_id of the requested document."
    }
];

const Dashboard = () => {
    const [filter, setFilter] = useState('All');

    const filteredVulns = filter === 'All'
        ? dummyVulnerabilities
        : dummyVulnerabilities.filter(v => v.severity === filter);

    const stats = {
        total: dummyVulnerabilities.length,
        critical: dummyVulnerabilities.filter(v => v.severity === 'Critical').length,
        high: dummyVulnerabilities.filter(v => v.severity === 'High').length,
    };

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
                <HoverTrail color="rgba(99,102,241,0.7)" className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Issues</p>
                        <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </HoverTrail>
                <HoverTrail color="rgba(244,63,94,0.7)" className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Critical Severity</p>
                        <p className="text-3xl font-bold text-rose-500">{stats.critical}</p>
                    </div>
                    <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400">
                        <Tag className="w-6 h-6" />
                    </div>
                </HoverTrail>
                <HoverTrail color="rgba(249,115,22,0.7)" className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">High Severity</p>
                        <p className="text-3xl font-bold text-orange-500">{stats.high}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400">
                        <Tag className="w-6 h-6" />
                    </div>
                </HoverTrail>
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
