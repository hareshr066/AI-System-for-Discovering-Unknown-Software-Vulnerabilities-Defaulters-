import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Code2, 
  Cpu, 
  Activity, 
  AlertTriangle, 
  Fingerprint, 
  Lock, 
  Server, 
  GitBranch, 
  Terminal,
  Filter 
} from 'lucide-react';

const BackgroundParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 0.8, 0],
            scale: [1, Math.random() + 1, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Section = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className={`w-full max-w-7xl mx-auto px-6 py-24 ${className}`}
  >
    {children}
  </motion.section>
);

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 overflow-x-hidden relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <BackgroundParticles />

      {/* 1. HERO SECTION */}
      <Section id="hero" className="flex flex-col items-center justify-center min-h-[90vh] text-center pt-32 lg:pt-40 relative z-10">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-indigo-500/30 mb-10 shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#22C55E]"></span>
          </span>
          <span className="text-sm font-medium text-indigo-300 tracking-wide">Autonomous AI Security Engine Active</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-500 filter drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">Unknown</span> <br />
          Vulnerabilities
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-14 leading-relaxed font-light">
          An advanced AI-driven pipeline that analyzes, executes, and uncovers sophisticated zero-day threats in your codebase before they are ever exploited.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 z-20">
          <Link
            to="/upload"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_rgba(99,102,241,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Activity className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
            <span className="relative z-10 text-lg tracking-wide">Start Scan</span>
          </Link>
          <Link
            to="/dashboard"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900/50 hover:bg-slate-800 text-slate-300 font-bold rounded-full transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] backdrop-blur-md"
          >
            <Server className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            <span className="text-lg tracking-wide">View Dashboard</span>
          </Link>
        </motion.div>
      </Section>

      {/* 2. AI SYSTEM OVERVIEW SECTION */}
      <Section id="pipeline" className="relative z-10 mt-10">
        <motion.div variants={fadeUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">The Neural Pipeline</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">How our autonomous system dissects programs to discover critical flaws.</p>
        </motion.div>

        <motion.div variants={stagger} className="flex flex-col lg:flex-row items-stretch justify-center gap-6 relative">
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-slate-800 -translate-y-1/2 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {[
            { step: "01", title: "Program Analysis", icon: Code2, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
            { step: "02", title: "AI Input Gen", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
            { step: "03", title: "Execution Monitor", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
            { step: "04", title: "Anomaly Detect", icon: Filter, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
            { step: "05", title: "Vuln Report", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className={`flex-1 relative z-10 bg-slate-900/80 backdrop-blur-xl border ${item.border} p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 group hover:-translate-y-2`}>
              <div className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <span className="text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Phase {item.step}</span>
              <h3 className="text-lg font-bold text-slate-200">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 3. FEATURE CARDS */}
      <Section id="features" className="relative z-10 mt-10">
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Program Analyzer", description: "Deep abstract syntax tree parsing to understand structural semantics.", icon: Terminal, glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]", accent: "indigo-400", bgAccent:"bg-indigo-500" },
            { title: "Automated Intelligent Testing", description: "Fuzzing combined with neural guidance to reach deep execution branches.", icon: Zap, glow: "hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]", accent: "emerald-400", bgAccent:"bg-emerald-500" },
            { title: "AI Anomaly Detection", description: "Detects memory leaks, buffer overflows, and race conditions via behavioral models.", icon: Fingerprint, glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]", accent: "cyan-400", bgAccent:"bg-cyan-500" },
            { title: "Vulnerability Explanation Engine", description: "Generates human-readable RCA (Root Cause Analysis) for complex vulnerabilities.", icon: Lock, glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]", accent: "red-400", bgAccent:"bg-red-500" }
          ].map((feat, i) => (
            <motion.div key={i} variants={fadeUp} className={`group relative bg-slate-800/40 border border-slate-700 p-10 rounded-3xl overflow-hidden transition-all duration-500 ${feat.glow} backdrop-blur-sm hover:bg-slate-800/80 hover:-translate-y-1`}>
              <div className={`absolute -top-10 -right-10 w-40 h-40 ${feat.bgAccent} opacity-10 rounded-full blur-[50px] group-hover:opacity-20 transition-opacity duration-500`} />
              <div className="relative z-10">
                <feat.icon className={`w-10 h-10 mb-6 text-slate-400 group-hover:text-${feat.accent} transition-colors duration-300`} />
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 4. INTERACTIVE ARCHITECTURE & 5. DASHBOARD PREVIEW */}
      <Section id="architecture-dashboard" className="relative z-10 mt-10 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Architecture Concept */}
          <motion.div variants={fadeUp} className="relative aspect-square max-h-[500px] flex items-center justify-center m-auto w-full">
            <div className="absolute inset-0 bg-indigo-900/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 w-full h-full flex items-center justify-center scale-75 md:scale-100">
              {/* Central Node */}
              <motion.div 
                className="w-32 h-32 rounded-full bg-slate-900 border border-indigo-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.4)] z-30 relative"
                animate={{ boxShadow: ["0 0 40px rgba(99,102,241,0.3)", "0 0 80px rgba(99,102,241,0.6)", "0 0 40px rgba(99,102,241,0.3)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-24 h-24 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-400/30">
                  <ShieldCheck className="w-10 h-10 text-indigo-400" />
                </div>
              </motion.div>

              {/* Orbiting Nodes */}
              {[
                { label: "Target Code", delay: 0 },
                { label: "Model Weights", delay: -6.6 },
                { label: "Execution Sandbox", delay: -13.3 },
              ].map((orbit, i) => (
                <motion.div
                  key={i}
                  className="absolute z-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: orbit.delay }}
                  style={{ width: `${(i+2)*110}px`, height: `${(i+2)*110}px` }}
                >
                  <div className="w-full h-full rounded-full border border-slate-700/40 absolute top-0 left-0 border-dashed" />
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg whitespace-nowrap text-slate-300 flex items-center gap-2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: orbit.delay }}
                  >
                    <div className={`w-2 h-2 rounded-full ${i===0?'bg-emerald-400':i===1?'bg-cyan-400':'bg-indigo-400'} shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
                    {orbit.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div variants={fadeUp} className="bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 z-0" />
            
            <div className="bg-slate-900/80 border-b border-slate-700/80 px-6 py-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs font-mono font-medium text-slate-400 tracking-wider">LIVE_SCAN_RESULTS</div>
            </div>

            <div className="p-8 relative z-10 flex flex-col gap-5">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 hover:bg-red-500/20 transition-colors"
              >
                <div className="bg-red-500/20 p-2.5 rounded-xl"><AlertTriangle className="text-red-400 w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-slate-200">Buffer Overflow</h4>
                    <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                       High
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono tracking-wide">auth_module.c : 142</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl flex items-start gap-4 hover:bg-yellow-500/20 transition-colors"
              >
                <div className="bg-yellow-500/20 p-2.5 rounded-xl"><Activity className="text-yellow-400 w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-slate-200">Memory Leak</h4>
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Medium</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono tracking-wide">session_manager.cpp : 89</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-2xl flex items-start gap-4 hover:bg-indigo-500/20 transition-colors"
              >
                <div className="bg-indigo-500/20 p-2.5 rounded-xl"><ShieldCheck className="text-indigo-400 w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-slate-200">Race Condition</h4>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Low</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono tracking-wide">worker_pool.rs : 215</p>
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
