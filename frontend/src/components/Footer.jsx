import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, X, Info } from 'lucide-react';
import ThreatLensLogo from '../assets/ThreatLenslogo.jpeg';

const Footer = ({ className = "" }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);

    const productInfo = {
        "Scanner Engine": "Our core neural system that performs recursive AST-level analysis to detect semantic anomalies and complex logic bugs. It utilizes advanced machine learning models trained on millions of CVEs to predict and prevent future exploits before they manifest in production environments.",
        "Analytics Dashboard": "Real-time visualization of your attack surface, threat trends, and autonomous remediation performance across all repositories. Get deep insights into vulnerabilities, resolution times, and the overall security health of your entire software ecosystem through interactive heatmaps and predictive charts.",
        "API Integration": "Deploy ThreatLens via secure REST endpoints or our native CI/CD plugins for automated security at every build step. Seamlessly integrate with GitHub, GitLab, Jenkins, and Azure DevOps to ensure your code is scanned and secured automatically during every push or pull request.",
        "Enterprise Data": "High-fidelity threat intelligence feeds and dedicated sandboxing environments for mission-critical software assets. Access exclusive datasets and perform deep forensic analysis in isolated, secure containers to understand the full impact of potential threats without risking your infrastructure."
    };

    const resourceInfo = {
        "Documentation": "Comprehensive guides on integrating ThreatLens, configuring neural scanning parameters, and managing security policies. Explore our multi-layered approach to security, including detailed API references, implementation best practices, and troubleshooting tips for complex enterprise deployments.",
        "Security Blog": "Updates on recent zero-day discovery techniques, AI-driven remediation case studies, and industry security trends. Stay ahead of the curve with expert analysis from our team of researchers and developers who are pioneering the future of autonomous software defense.",
        "Research Papers": "Deep dives into our neural architecture, autonomous patching algorithms, and formal verification of remediated code. Read our peer-reviewed publications on how we combine symbolic execution with deep learning to achieve unprecedented accuracy in vulnerability detection."
    };

    return (
        <>
            <AnimatePresence>
                {(selectedProduct || selectedResource) && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                        {/* Popup Overlay with background blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="popup-overlay absolute inset-0 bg-[#030305]/85 backdrop-blur-2xl cursor-pointer"
                            onClick={() => { setSelectedProduct(null); setSelectedResource(null); }}
                        />

                        {/* Popup Modal Central Card */}
                        <motion.div
                            className={`popup-modal relative z-[10000] p-8 md:p-14 rounded-[3rem] max-w-4xl w-full border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden footer-popup-card ${selectedProduct
                                ? 'bg-gradient-to-br from-[#0A0A12] via-[#0A0A12] to-[#002F36]'
                                : 'bg-gradient-to-br from-[#0A0A12] via-[#0A0A12] to-[#2F0036]'
                                }`}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.85,
                                y: 40,
                                transition: { duration: 0.4, ease: "easeIn" }
                            }}
                            transition={{ type: "spring", damping: 25, stiffness: 180 }}
                            style={{
                                boxShadow: selectedProduct
                                    ? '0 0 60px rgba(0, 243, 255, 0.1), inset 0 0 40px rgba(0, 243, 255, 0.02)'
                                    : '0 0 60px rgba(188, 19, 254, 0.1), inset 0 0 40px rgba(188, 19, 254, 0.02)'
                            }}
                        >
                            <button
                                onClick={() => { setSelectedProduct(null); setSelectedResource(null); }}
                                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all hover:rotate-90 duration-300"
                            >
                                <X size={28} />
                            </button>

                            <div className="popup-content">
                                <div className="flex items-start gap-8 mb-12">
                                    <div className={`p-6 rounded-[2rem] ${selectedProduct ? 'bg-[#00F3FF]/10 text-[#00F3FF]' : 'bg-[#BC13FE]/10 text-[#BC13FE]'}`}>
                                        <Info size={48} />
                                    </div>
                                    <div>
                                        <span className={`text-xs font-black uppercase tracking-[0.4em] opacity-40 mb-3 block ${selectedProduct ? 'text-[#00F3FF]' : 'text-[#BC13FE]'}`}>System Intel</span>
                                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{selectedProduct || selectedResource}</h3>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-xl md:text-2xl leading-relaxed font-light">
                                    {selectedProduct ? productInfo[selectedProduct] : resourceInfo[selectedResource]}
                                </p>
                                <div className="mt-14 pt-12 border-t border-white/[0.04] flex justify-end">
                                    <button
                                        onClick={() => { setSelectedProduct(null); setSelectedResource(null); }}
                                        className={`px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl ${selectedProduct
                                            ? 'bg-[#00F3FF] text-[#030305] shadow-[#00F3FF]/20'
                                            : 'bg-[#BC13FE] text-white shadow-[#BC13FE]/20'
                                            }`}
                                    >
                                        Acknowledge Directive
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <footer className={`w-full py-4 md:py-8 px-6 md:px-12 mt-6 border-t border-slate-900 bg-[#030305]/95 backdrop-blur-3xl relative z-10 footer-container ${className}`}>

                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mb-6 footer-grid">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-3 group footer-brand">
                            <img src={ThreatLensLogo} alt="ThreatLens" className="w-7 h-7 rounded-full object-cover transition-all duration-300 group-hover:drop-shadow-[0_0_10px_#00F3FF] footer-icon" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#00F3FF] footer-logo tracking-tighter">ThreatLens</span>
                        </Link>
                        <p className="text-slate-500 text-[13px] leading-relaxed mb-4 footer-brand-description max-w-[220px] font-medium">
                            Advancing autonomous software security through AI-driven discovery and remediation.
                        </p>
                        <div className="flex items-center gap-4 text-slate-500 footer-social-icons">
                            <a href="https://github.com/hareshr066/AI-System-for-Discovering-Unknown-Software-Vulnerabilities-Defaulters-" target="_blank" rel="noreferrer" className="hover:text-[#00F3FF] transition-all duration-300 hover:scale-125">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/team-defaulters-22b8b43b5/" target="_blank" rel="noreferrer" className="hover:text-[#00F3FF] transition-all duration-300 hover:scale-125">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-4 opacity-30">Directives</h3>
                        <ul className="space-y-2 footer-links footer-product-links">
                            {Object.keys(productInfo).map(name => (
                                <li key={name}>
                                    <button
                                        onClick={() => setSelectedProduct(name)}
                                        className="text-slate-500 hover:text-[#00F3FF] transition-all duration-300 text-[12px] text-left font-black"
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-4 opacity-30">Intellect</h3>
                        <ul className="space-y-2 footer-links footer-resource-links">
                            {Object.keys(resourceInfo).map(name => (
                                <li key={name}>
                                    <button
                                        onClick={() => setSelectedResource(name)}
                                        className="text-slate-500 hover:text-[#BC13FE] transition-all duration-300 text-[12px] text-left font-black"
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-1 footer-contact">
                        <h3 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-4 opacity-30">Contact</h3>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:threatlens1@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-[#00F3FF] transition-all duration-300 text-sm group">
                                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">threatlens1@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-4 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4 footer-bottom">
                    <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                        &copy; {new Date().getFullYear()} ThreatLens. Autonomous Defense.
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
                        <Link to="/privacy-policy" className="text-slate-700 hover:text-[#00F3FF] transition-all duration-300">Privacy Protocol</Link>
                        <Link to="/terms-of-service" className="text-slate-700 hover:text-[#00F3FF] transition-all duration-300">Service Terms</Link>
                        <Link to="/security" className="text-slate-700 hover:text-[#00F3FF] transition-all duration-300">Security Node</Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
