import React from 'react';
import { ShieldCheck, Lock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="w-full max-w-5xl mx-auto pb-16 pt-8 text-slate-300 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-10 h-10 text-emerald-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
            Privacy Policy
          </h1>
        </div>
        <p className="text-emerald-500/60 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 via-green-500/20 to-transparent mt-8"></div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <section className="bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-semibold text-emerald-50">1. Information We Collect</h2>
          </div>
          <p className="leading-relaxed mb-4 text-slate-300">
            We prioritize your privacy above all else. When you use our vulnerability scanning services, we collect minimal data necessary to function correctly. This includes code snippets submitted for analysis, repository metadata, and standard connection logs.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>Account information (email, associated organization)</li>
            <li>Code structures and structural metadata analyzed via our AI</li>
            <li>System performance and usage metrics</li>
          </ul>
        </section>

        <section className="bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-semibold text-emerald-50">2. How We Use Information</h2>
          </div>
          <p className="leading-relaxed text-slate-300">
            The data collected is used strictly for identifying security flaws, generating remediation advice, and improving our artificial intelligence models. We do not sell, rent, or trade your data. Your source code is processed ephemerally and discarded unless explicit permission is granted for model training.
          </p>
        </section>

        <section className="bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.05)]">
           <h2 className="text-2xl font-semibold text-emerald-50 mb-4">3. Data Security & Retention</h2>
          <p className="leading-relaxed text-slate-300">
            We implement bank-level encryption (AES-256) for all data at rest and TLS 1.3 for data in transit. Routine security audits are performed by independent third parties. Data is retained only for the duration of your active subscription.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
