import React, { useState } from 'react';
import { Card } from './ui/Card';
import { CLASSES, STUDENTS, BELTS } from '../constants';
import { Check, X, FileText, CalendarDays } from 'lucide-react';

export const Attendance: React.FC = () => {
    const [selectedClassId, setSelectedClassId] = useState<string>(CLASSES[0].id);
    const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
    
    // Simulate fetching students for the class (currently getting all active)
    const activeStudents = STUDENTS.filter(s => s.active);

    // Local state for attendance marking (just for UI interaction)
    const [markedStatus, setMarkedStatus] = useState<Record<string, 'present'|'absent'|'justified'>>({});

    const handleMark = (studentId: string, status: 'present'|'absent'|'justified') => {
        setMarkedStatus(prev => ({ ...prev, [studentId]: status }));
    };

    const getBeltColor = (beltId: string) => BELTS.find(b => b.id === beltId)?.color;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-3xl font-bold text-white brand-font">Registro de Presença</h2>
                <p className="text-slate-400">Gerencie a frequência diária do Dojô.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Control Panel */}
                <Card className="lg:col-span-1 h-fit">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">Configuração</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Data</label>
                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="date" 
                                    value={attendanceDate}
                                    onChange={(e) => setAttendanceDate(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Turma</label>
                            <div className="space-y-2">
                                {CLASSES.map(cls => (
                                    <button
                                        key={cls.id}
                                        onClick={() => setSelectedClassId(cls.id)}
                                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                                            selectedClassId === cls.id
                                            ? 'bg-cyan-900/20 border-cyan-500 text-cyan-300'
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                                        }`}
                                    >
                                        <div className="font-medium">{cls.name}</div>
                                        <div className="text-xs opacity-70">{cls.schedule}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg mt-4 shadow-lg shadow-emerald-900/20 transition-all">
                            Salvar Chamada
                        </button>
                    </div>
                </Card>

                {/* List */}
                <Card className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-200">
                            Lista de Alunos ({activeStudents.length})
                        </h3>
                        <span className="text-xs text-slate-500 uppercase tracking-widest">
                            {new Date(attendanceDate).toLocaleDateString('pt-BR')}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {activeStudents.map(student => {
                            const status = markedStatus[student.id];
                            return (
                                <div key={student.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800/50 hover:border-slate-700 transition">
                                    <div className="flex items-center gap-3">
                                        <div 
                                            className="w-2 h-8 rounded-full" 
                                            style={{ backgroundColor: getBeltColor(student.beltId) }}
                                        />
                                        <div>
                                            <p className="font-medium text-slate-200">{student.name}</p>
                                            {student.project && <span className="text-[10px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">Projeto</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleMark(student.id, 'present')}
                                            className={`p-2 rounded-full transition-all ${status === 'present' ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                                            title="Presente"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleMark(student.id, 'absent')}
                                            className={`p-2 rounded-full transition-all ${status === 'absent' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                                            title="Ausente"
                                        >
                                            <X size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleMark(student.id, 'justified')}
                                            className={`p-2 rounded-full transition-all ${status === 'justified' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                                            title="Justificado"
                                        >
                                            <FileText size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
};
