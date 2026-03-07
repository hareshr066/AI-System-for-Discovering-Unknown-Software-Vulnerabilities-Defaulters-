import React from 'react';
import { Shield, Server, Key, Cpu, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Security = () => {
  return (
    <div className="w-full max-w-5xl mx-auto pb-16 pt-8 text-slate-300 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex justify-center items-center p-4 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <Shield className="w-12 h-12 text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
          Platform Security
        </h1>
        <p className="text-emerald-500/70 text-lg max-w-2xl mx-auto">
          Security is built into our core. Discover how we protect your source code, data, and analytical insights with enterprise-grade infrastructure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/60 backdrop-blur-lg border border-emerald-500/20 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
        >
          <Server className="w-8 h-8 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-emerald-50 mb-3">Infrastructure Security</h3>
          <p className="text-slate-400 leading-relaxed">
            Our platform runs on isolated, hardened containers within Virtual Private Clouds (VPCs). All infrastructure is defined as code (IaC) and scanned for misconfigurations automatically.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/60 backdrop-blur-lg border border-emerald-500/20 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
        >
          <Key className="w-8 h-8 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-emerald-50 mb-3">Data Encryption</h3>
          <p className="text-slate-400 leading-relaxed">
            All data is encrypted in transit using TLS 1.3 and at rest using AES-256. We utilize AWS KMS for secure key management and automatic key rotation.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/60 backdrop-blur-lg border border-emerald-500/20 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
        >
          <Cpu className="w-8 h-8 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-emerald-50 mb-3">Ephemeral AI Processing</h3>
          <p className="text-slate-400 leading-relaxed">
            Your source code is processed entirely in memory. Once the vulnerability analysis is complete and the report is generated, the raw code is permanently purged from memory.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/60 backdrop-blur-lg border border-emerald-500/20 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
        >
          <Activity className="w-8 h-8 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-emerald-50 mb-3">Continuous Monitoring</h3>
          <p className="text-slate-400 leading-relaxed">
            24/7 SOC monitoring, automated intrusion detection, and active threat hunting keep our systems protected against emerging zero-day threats.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;
