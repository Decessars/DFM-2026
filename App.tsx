import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Attendance } from './components/Attendance';
import { Evaluations } from './components/Evaluations';
import { Inventory } from './components/Inventory';
import { Finance } from './components/Finance';
import { Exams } from './components/Exams';
import { Settings } from './components/Settings';
import { Footer } from './components/Footer';
import { MOCK_USER } from './constants';
import { CalendarDays, Menu, X } from 'lucide-react';
import { Card } from './components/ui/Card';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DojoProvider } from './contexts/DojoContext';

const ClassesPlaceholder = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-slate-200 brand-font">Turmas & Horários</h2>
        <Card className="flex flex-col items-center justify-center min-h-[400px]">
            <CalendarDays size={64} className="text-red-500/30 mb-4" />
            <p className="text-slate-500">Grade Semanal (Em desenvolvimento)</p>
        </Card>
    </div>
);

const AppContent: React.FC = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { getThemeClasses } = useTheme();
    const theme = getThemeClasses();

    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <Dashboard />;
            case 'students': return <Students />;
            case 'classes': return <ClassesPlaceholder />;
            case 'attendance': return <Attendance />;
            case 'evaluations': return <Evaluations />;
            case 'inventory': return <Inventory />;
            case 'finance': return <Finance />;
            case 'exams': return <Exams />;
            case 'settings': return <Settings />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen font-sans selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden">
            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar 
                currentUser={MOCK_USER} 
                currentView={currentView} 
                setView={(view) => {
                    setCurrentView(view);
                    setIsSidebarOpen(false); // Close on mobile after selection
                }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className={`md:hidden flex items-center justify-between p-4 border-b ${theme.border} ${theme.bg} z-30`}>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="text-lg font-bold text-red-500 brand-font italic">DOJO CODEX</span>
                    </div>
                    <span className="text-[10px] text-red-500/60 font-bold tracking-widest">DFM 2026</span>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto relative flex flex-col">
                    <div className="max-w-7xl mx-auto w-full flex-1">
                        {renderView()}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <DojoProvider>
                <AppContent />
            </DojoProvider>
        </ThemeProvider>
    );
};

export default App;