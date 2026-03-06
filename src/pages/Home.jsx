import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Code2 } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-sm font-medium">AI-Powered Security Engine Active</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                Secure Your Code <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">
                    At The Speed Of Thought
                </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
                Upload your source code and let our advanced AI Vulnerability Scanner identify zero-days, buffer overflows, and architectural flaws in seconds.
            </p>

            <div className="flex items-center gap-4">
                <Link
                    to="/upload"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] hover:-translate-y-1"
                >
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Start Scan
                </Link>
                <Link
                    to="/dashboard"
                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-full transition-all duration-300 border border-slate-700 hover:border-slate-600"
                >
                    View Dashboard
                </Link>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
                {[
                    { icon: ShieldCheck, title: "Deep Analysis", desc: "Our engine parses syntax trees to find complex logic flows and hidden vulnerabilities." },
                    { icon: Zap, title: "Lightning Fast", desc: "Get comprehensive security reports in a matter of seconds, unblocking your CI/CD." },
                    { icon: Code2, title: "Multiple Languages", desc: "Support for C, C++, Python, JavaScript, and other popular programming languages." }
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                            <feature.icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
