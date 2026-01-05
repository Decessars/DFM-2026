import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType } from '../types';

interface ThemeContextType {
    currentTheme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    getThemeClasses: () => { bg: string, card: string, text: string, border: string, input: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('theme-1');

    // Mapeamento dos 7 temas solicitados
    const themeStyles: Record<ThemeType, any> = {
        'theme-1': { // Muito escuro (Dark) - Default
            bg: 'bg-slate-950', card: 'bg-slate-900/60', text: 'text-slate-200', border: 'border-slate-800', input: 'bg-slate-950'
        },
        'theme-2': { // Escuro Moderado
            bg: 'bg-slate-900', card: 'bg-slate-800/80', text: 'text-slate-200', border: 'border-slate-700', input: 'bg-slate-900'
        },
        'theme-3': { // Intermediário Escuro
            bg: 'bg-zinc-900', card: 'bg-zinc-800/80', text: 'text-zinc-200', border: 'border-zinc-700', input: 'bg-zinc-900'
        },
        'theme-4': { // Neutro (Meio Termo)
            bg: 'bg-stone-800', card: 'bg-stone-700/80', text: 'text-stone-100', border: 'border-stone-600', input: 'bg-stone-800'
        },
        'theme-5': { // Intermediário Claro
            bg: 'bg-slate-200', card: 'bg-white', text: 'text-slate-800', border: 'border-slate-300', input: 'bg-slate-100'
        },
        'theme-6': { // Claro Moderado
            bg: 'bg-gray-100', card: 'bg-white', text: 'text-gray-900', border: 'border-gray-200', input: 'bg-gray-50'
        },
        'theme-7': { // Muito Claro (Light)
            bg: 'bg-white', card: 'bg-slate-50', text: 'text-slate-950', border: 'border-slate-200', input: 'bg-white'
        }
    };

    const getThemeClasses = () => themeStyles[currentTheme];

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, getThemeClasses }}>
            <div className={`min-h-screen transition-colors duration-500 ${themeStyles[currentTheme].bg} ${themeStyles[currentTheme].text}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
