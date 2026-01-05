import React from 'react';
import { Card } from './ui/Card';
import { useDojo } from '../contexts/DojoContext';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';

export const Exams: React.FC = () => {
    const { examEvents } = useDojo();
    const { getThemeClasses } = useTheme();
    const theme = getThemeClasses();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <h2 className={`text-3xl font-bold ${theme.text} brand-font`}>Exames de Faixa</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-red-900/20">
                    <Plus size={18} /> Novo Evento
                </button>
            </header>

            <div className="space-y-4">
                {examEvents.map(event => (
                    <Card key={event.id} className="hover:border-red-500/50 cursor-pointer">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1">
                                <h3 className={`text-xl font-bold ${theme.text} mb-2`}>{event.name}</h3>
                                <div className="flex gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(event.date).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
                                    {event.fee && <span>Taxa: R$ {event.fee.toFixed(2)}</span>}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 text-sm">Candidatos</button>
                                <button className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-600/30 rounded hover:bg-red-600/20 text-sm">Gerenciar</button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
