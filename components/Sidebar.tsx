import React from 'react';
import { 
  LayoutDashboard, Users, CalendarDays, ClipboardCheck, 
  TrendingUp, Package, Activity, Award, Settings, LogOut, X
} from 'lucide-react';
import { User } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
    currentUser: User;
    currentView: string;
    setView: (view: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentView, setView, isOpen, onClose }) => {
    const { getThemeClasses } = useTheme();
    const theme = getThemeClasses();
    
    const menuItems = [
        { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
        { id: 'students', label: 'Alunos & Projetos', icon: Users },
        { id: 'classes', label: 'Turmas & Horários', icon: CalendarDays },
        { id: 'attendance', label: 'Presenças', icon: ClipboardCheck },
        { id: 'evaluations', label: 'Avaliações', icon: Activity },
        { id: 'exams', label: 'Exames de Faixa', icon: Award },
        { id: 'inventory', label: 'Bens / Inventário', icon: Package },
        { id: 'finance', label: 'Financeiro', icon: TrendingUp },
        { id: 'settings', label: 'Configurações', icon: Settings },
    ];

    return (
        <aside className={`
            fixed md:static inset-y-0 left-0 z-50
            w-64 h-screen ${theme.bg} border-r ${theme.border} 
            flex flex-col transition-all duration-300 ease-in-out
            ${isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0'}
        `}>
            <div className={`p-6 border-b ${theme.border} flex items-center justify-between`}>
                <div>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 brand-font italic">
                        DOJO CODEX
                    </h1>
                    <p className="text-xs text-red-500/60 mt-1 tracking-[0.2em] font-bold uppercase">DFM 2026</p>
                </div>
                <button 
                    onClick={onClose}
                    className="md:hidden p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                isActive 
                                ? 'bg-red-600/10 text-red-500 border border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
                                : `text-slate-500 hover:${theme.card} hover:text-red-400`
                            }`}
                        >
                            <Icon size={20} className={isActive ? 'text-red-500' : 'text-slate-500 group-hover:text-red-400'} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className={`p-4 border-t ${theme.border}`}>
                <div className="flex items-center gap-3 px-4 py-3">
                    <img 
                        src={currentUser.avatarUrl} 
                        alt="User" 
                        className="w-10 h-10 rounded-full border-2 border-red-600/50"
                    />
                    <div className="flex-1 overflow-hidden">
                        <p className={`text-sm font-medium truncate ${theme.text}`}>{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.profile}</p>
                    </div>
                    <button className="text-slate-500 hover:text-red-500 transition-colors">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};