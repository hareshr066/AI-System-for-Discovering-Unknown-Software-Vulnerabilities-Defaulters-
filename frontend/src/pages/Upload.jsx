import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, ShieldCheck, File as FileIcon, X, CheckCircle2, FileCode2, AlertCircle } from 'lucide-react';
import ParticleNetwork from '../components/ParticleNetwork';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleStartScan = async () => {
        if (!file) return;
        setIsUploading(true);
        setError("");

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/upload-folder', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to upload file");
            }

            // File uploaded successfully, now navigate to the scan page
            // The scan page will actually trigger the AI analysis
            navigate('/scan');
        } catch (err) {
            console.error("Upload error:", err);
            setError(err.message || "An error occurred during upload. Is the backend running?");
            setIsUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave" || e.type === "drop") {
            setIsDragging(false);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        const validExtensions = ['.c', '.cpp', '.js', '.py', '.go'];
        const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            setError("Invalid file type. Supported formats: C, C++, Python, JavaScript, Go.");
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("File size exceeds the 10MB limit.");
            return;
        }

        setFile(selectedFile);
        setError("");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const removeFile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFile(null);
        setError("");
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
        <ParticleNetwork />
        <div className="relative min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} z-10">

            <style>{`
                @keyframes cardEnter {
                    0% { transform: translateY(30px) scale(0.97); opacity: 0; filter: blur(10px); }
                    100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
                }
                .animate-card-enter {
                    animation: cardEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>

            {/* Background Elements - Removed, using CinematicBackground */}

            {/* Top Light Flare */}
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50 shadow-[0_0_20px_rgba(0,243,255,0.5)] z-20"></div>

            {/* Centered Main Section */}
            <main className="relative z-10 w-full flex flex-col items-center justify-center flex-1 pb-20 pt-10">
                <div className="text-center mb-12 w-full max-w-2xl px-4 animate-card-enter" style={{ animationDelay: '0.1s' }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F3FF]/10 border border-[#00F3FF]/20 text-[#00F3FF] text-sm font-medium mb-6 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F3FF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F3FF]"></span>
                        </span>
                        Secure Pipeline Active
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 drop-shadow-sm">
                        Code Analysis
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Upload your code for deep vulnerability scanning.
                        Our engine securely analyzes and identifies potential risks in real-time.
                    </p>
                </div>

                {/* Upload Card */}
                <div className="w-full max-w-2xl bg-[rgba(10,10,15,0.6)] backdrop-blur-xl border border-[#00F3FF]/10 rounded-3xl p-1 sm:p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 border border-[#00F3FF]/20 rounded-3xl pointer-events-none"></div>
                    <div className="bg-slate-900/90 rounded-[1.3rem] p-8 sm:p-10 w-full h-full relative overflow-hidden">

                        <div className="relative z-10 flex flex-col items-center w-full">

                            {/* Drag and Drop Zone */}
                            {!file ? (
                                <label
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    htmlFor="code-upload"
                                    className={`w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF] focus-visible:border-transparent ${isDragging
                                            ? 'border-[#00F3FF] bg-[#00F3FF]/10 shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                                            : 'border-slate-700 bg-slate-800/20 hover:border-[#00F3FF]/50 hover:bg-[#00F3FF]/5'
                                        }`}
                                >
                                    <div className={`mb-6 transition-all duration-500 ${isDragging ? 'text-[#00F3FF] scale-125 drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]' : 'text-slate-500 group-hover/card:text-[#00F3FF]'}`}>
                                        <UploadCloud className="w-16 h-16" strokeWidth={1} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-slate-200">
                                        {isDragging ? 'Drop file to initiate scan' : 'Click or drag file to upload'}
                                    </h3>
                                    <p className="text-slate-500 mb-8 text-center text-sm font-medium">
                                        Limit: 10MB • End-to-End Encrypted Processing
                                    </p>

                                    {/* Supported Languages Indicators */}
                                    <div className="flex flex-wrap justify-center gap-3 w-full">
                                        {['C', 'C++', 'Python', 'JavaScript', 'Go'].map((lang, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-950/50 border border-slate-800 text-center transition-all hover:border-slate-600">
                                                <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="text-xs font-semibold text-slate-400">{lang}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <input
                                        id="code-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleChange}
                                        accept=".c,.cpp,.js,.py,.go"
                                    />
                                </label>
                            ) : (
                                // Uploaded File Area
                                <div className="w-full flex items-center justify-between p-6 bg-slate-950 border border-[#00F3FF]/30 rounded-xl animate-in fade-in zoom-in-95 duration-500 shadow-[0_0_30px_rgba(0,243,255,0.1)] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F3FF]/10 to-transparent pointer-events-none"></div>

                                    <div className="flex items-center gap-5 min-w-0 relative z-10">
                                        <div className="flex-shrink-0 p-4 bg-[#00F3FF]/10 rounded-xl border border-[#00F3FF]/20 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                                            <FileIcon className="w-8 h-8 text-[#00F3FF]" strokeWidth={1.5} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-base font-semibold text-slate-200 truncate pr-4">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-slate-500 mt-1 font-medium">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0 pl-6 border-l border-slate-800 relative z-10">
                                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            <span className="text-xs font-bold tracking-wide text-emerald-400 uppercase">Ready</span>
                                        </div>
                                        <button
                                            onClick={removeFile}
                                            className="p-2.5 text-slate-500 hover:text-white hover:bg-slate-800 transition-all rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF] hover:shadow-lg"
                                            aria-label="Replace file"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="w-full mt-6 flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="font-medium">{error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-10 w-full relative">
                                <button
                                    onClick={handleStartScan}
                                    disabled={!file || isUploading}
                                    className={`w-full group relative flex items-center justify-center gap-3 px-6 py-5 rounded-xl font-bold text-lg transition-all duration-500 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-[#00F3FF] ${
                                        file && !isUploading
                                        ? 'bg-[#00F3FF] text-slate-950 hover:scale-[1.02] shadow-[0_0_40px_rgba(0,243,255,0.4)]'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                    }`}
                                >
                                    {/* Shining effect on hover for active button */}
                                    {file && !isUploading && (
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                                    )}
                                    <style>{`
                                        @keyframes shimmer {
                                            100% { transform: translateX(100%); }
                                        }
                                    `}</style>
                                    {isUploading ? (
                                        <div className="w-6 h-6 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin"></div>
                                    ) : (
                                        <ShieldCheck className={`w-6 h-6 transition-transform duration-300 ${file ? 'group-hover:scale-110' : ''}`} />
                                    )}
                                    <span className="relative z-10">{isUploading ? 'Uploading & Preparing...' : 'Start Vulnerability Scan'}</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
};

export default Upload;
