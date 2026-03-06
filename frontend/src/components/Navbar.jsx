import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Home, Upload, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const NavLink = ({ to, icon: Icon, children }) => {
        const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
        return (
            <Link
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
            >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{children}</span>
            </Link>
        );
    };

    return (
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-indigo-400">
                        <ShieldAlert className="w-8 h-8" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            NexusScan
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-2">
                        <NavLink to="/" icon={Home}>Home</NavLink>
                        <NavLink to="/upload" icon={Upload}>Upload</NavLink>
                        <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
