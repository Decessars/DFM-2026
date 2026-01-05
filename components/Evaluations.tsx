import React, { useState } from 'react';
import { Card } from './ui/Card';
import { EVALUATION_TEMPLATES, STUDENTS } from '../constants';
import { EvaluationTemplate, EvaluationField } from '../types';
import { ClipboardList, Save, Activity } from 'lucide-react';

export const Evaluations: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<EvaluationTemplate | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleSubmit = () => {
        alert("Avaliação salva com sucesso! (Simulação)");
        setFormData({});
        setSelectedStudentId('');
    };

    const renderFieldInput = (field: EvaluationField) => {
        const val = formData[field.id] || '';

        switch (field.type) {
            case 'number':
                return (
                    <input 
                        type="number" 
                        value={val}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
                    />
                );
            case 'text':
                return (
                    <textarea 
                        value={val}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 focus:border-cyan-500 focus:outline-none min-h-[80px]"
                    />
                );
            case 'boolean':
                return (
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name={field.id}
                                checked={val === true}
                                onChange={() => handleInputChange(field.id, true)}
                                className="accent-cyan-500"
                            /> Sim
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name={field.id}
                                checked={val === false}
                                onChange={() => handleInputChange(field.id, false)}
                                className="accent-cyan-500"
                            /> Não
                        </label>
                    </div>
                );
            case 'scale_1_5':
                return (
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(num => (
                            <button
                                key={num}
                                onClick={() => handleInputChange(field.id, num)}
                                className={`w-10 h-10 rounded-full font-bold transition-all ${
                                    val === num 
                                    ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
             <header>
                <h2 className="text-3xl font-bold text-white brand-font">Central de Avaliações</h2>
                <p className="text-slate-400">Aplique testes físicos, técnicos ou comportamentais.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Selection Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <Card title="1. Selecione o Modelo">
                        <div className="space-y-2">
                            {EVALUATION_TEMPLATES.map(tpl => (
                                <button
                                    key={tpl.id}
                                    onClick={() => setSelectedTemplate(tpl)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                                        selectedTemplate?.id === tpl.id
                                        ? 'bg-cyan-900/20 border-cyan-500 text-cyan-300'
                                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                                    }`}
                                >
                                    <Activity size={20} />
                                    <div>
                                        <div className="font-medium">{tpl.name}</div>
                                        <div className="text-xs opacity-70 uppercase">{tpl.type}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card title="2. Selecione o Aluno">
                        <select 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-cyan-500 outline-none"
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                        >
                            <option value="">Selecione...</option>
                            {STUDENTS.filter(s => s.active).map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.beltId})</option>
                            ))}
                        </select>
                    </Card>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-8">
                    {selectedTemplate && selectedStudentId ? (
                        <Card className="h-full border-t-4 border-t-cyan-500">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedTemplate.name}</h3>
                                    <p className="text-slate-400 text-sm">Avaliando: <span className="text-cyan-400 font-medium">{STUDENTS.find(s => s.id === selectedStudentId)?.name}</span></p>
                                </div>
                                <div className="text-slate-500 text-sm">
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>

                            <div className="space-y-8">
                                {selectedTemplate.fields.map(field => (
                                    <div key={field.id} className="space-y-2">
                                        <label className="block text-slate-300 font-medium">{field.label}</label>
                                        {renderFieldInput(field)}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                                <button 
                                    onClick={handleSubmit}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] font-bold tracking-wide transition-all hover:scale-105"
                                >
                                    <Save size={20} />
                                    SALVAR AVALIAÇÃO
                                </button>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-600 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                            <ClipboardList size={64} className="mb-4 opacity-50" />
                            <p className="text-lg">Selecione um modelo e um aluno para começar.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
