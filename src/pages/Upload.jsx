import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import FileUploader from '../components/FileUploader';

const Upload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleStartScan = () => {
        if (file) {
            // In a real app we would pass the file to a context or state management here
            navigate('/scan');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl justify-center font-bold mb-4">Upload Source Code</h1>
                <p className="text-lg text-slate-400">
                    Upload your files to begin the AI vulnerability analysis process.
                    Our system supports most modern programming languages.
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />

                <div className="relative z-10 flex flex-col items-center">
                    <FileUploader onFileAccepted={(f) => setFile(f)} />

                    <div className="mt-12 text-center w-full max-w-sm">
                        <button
                            onClick={handleStartScan}
                            disabled={!file}
                            className={`w-full group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${file
                                    ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-1'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }`}
                        >
                            <Play className="w-5 h-5" />
                            Start Security Scan
                        </button>

                        <p className="mt-4 text-sm text-slate-500">
                            By uploading, you agree to our Terms of Service and Privacy Policy. All analyses are strictly confidential.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
