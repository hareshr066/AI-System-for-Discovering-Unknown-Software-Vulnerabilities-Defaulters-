import { useEffect, useState } from 'react';
import { Shield, Sparkles, AlertTriangle, Code, HardDrive, Cpu } from 'lucide-react';

const ScanProgress = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { name: "Initializing AI Agent...", icon: Cpu },
        { name: "Parsing Syntax Trees...", icon: Code },
        { name: "Analyzing Data Flows...", icon: HardDrive },
        { name: "Detecting Anomalies...", icon: AlertTriangle },
        { name: "Compiling Report...", icon: Sparkles }
    ];

    useEffect(() => {
        const totalDuration = 5000; // 5 seconds total
        const interval = 50; // Update every 50ms
        const stepsCount = totalDuration / interval;
        const increment = 100 / stepsCount;

        let currentProgress = 0;

        const timer = setInterval(() => {
            currentProgress += increment;
            setProgress(Math.min(currentProgress, 100));

            const stepIndex = Math.min(
                Math.floor((currentProgress / 100) * steps.length),
                steps.length - 1
            );
            setCurrentStep(stepIndex);

            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(onComplete, 500); // Wait a half second before completing
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    const CurrentIcon = steps[currentStep].icon;

    return (
        <div className="w-full max-w-xl mx-auto p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full animate-pulse" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-slate-900 border border-indigo-500/30 p-4 rounded-full">
                        <Shield className="w-12 h-12 text-indigo-400 animate-pulse" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2 tracking-tight text-white flex items-center gap-2">
                    <CurrentIcon className="w-6 h-6 text-indigo-400" />
                    {steps[currentStep].name}
                </h2>

                <p className="text-slate-400 mb-8 font-mono text-sm">
                    Please wait while we perform deep static analysis...
                </p>

                <div className="w-full bg-slate-900/50 rounded-full h-4 mb-3 border border-slate-700 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-200 ease-out flex items-center justify-end relative shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Sparkle effect on the edge of progress bar */}
                        <div className="w-4 h-full bg-white/30 blur-sm absolute right-0 animate-pulse" />
                    </div>
                </div>

                <div className="w-full flex justify-between text-xs text-slate-500 font-mono font-medium">
                    <span>0%</span>
                    <span className="text-indigo-400">{Math.round(progress)}%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
};

export default ScanProgress;
