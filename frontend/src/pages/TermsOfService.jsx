import React from 'react';
import { FileText, Scale, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="w-full max-w-5xl mx-auto pb-16 pt-8 text-slate-300 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-10 h-10 text-emerald-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
            Terms of Service
          </h1>
        </div>
        <p className="text-emerald-500/60 text-lg">Effective Date: {new Date().toLocaleDateString()}</p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 via-green-500/20 to-transparent mt-8"></div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <section className="bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/40 transition-all border-l-4 border-l-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-semibold text-emerald-50">1. Acceptance of Terms</h2>
          </div>
          <p className="leading-relaxed text-slate-300">
            By accessing or using our vulnerability scanning platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the service.
          </p>
        </section>

        <section className="bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-semibold text-emerald-50">2. Acceptable Use Policy</h2>
          </div>
          <p className="leading-relaxed mb-4 text-slate-300">
            You agree not to use the platform for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You may only scan systems, repositories, and applications for which you have explicit authorization.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>No unauthorized penetration testing of third-party systems.</li>
            <li>No reverse engineering the platform's AI algorithms.</li>
            <li>No sharing of enterprise credentials.</li>
          </ul>
        </section>

        <section className="bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)]">
           <h2 className="text-2xl font-semibold text-emerald-50 mb-4">3. Limitation of Liability</h2>
          <p className="leading-relaxed text-slate-300">
            While our AI models provide state-of-the-art vulnerability detection, they are not infallible. We are not liable for any undiscovered vulnerabilities, subsequent breaches, or business interruptions stemming from reliance on this platform.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
