import React, { useState } from 'react';
    import { Card } from './ui/Card';
    import { Modal } from './ui/Modal';
    import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Archive, AlertTriangle, Wallet } from 'lucide-react';
    import { useDojo } from '../contexts/DojoContext';
    import { useTheme } from '../contexts/ThemeContext';
    import { Student } from '../types';

    export const Students: React.FC = () => {
        const { students, belts, addStudent, updateStudent, archiveStudent } = useDojo();
        const { getThemeClasses } = useTheme();
        const theme = getThemeClasses();
        
        const [searchTerm, setSearchTerm] = useState('');
        const [filterProject, setFilterProject] = useState(false);
        const [filterFinancialStatus, setFilterFinancialStatus] = useState<string>('all');
        
        // Modal State
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);

        const filteredStudents = students.filter(student => {
            if (student.archived) return false;
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesProject = filterProject ? student.project : true;
            const matchesFinancial = filterFinancialStatus === 'all' ? true : student.financialStatus === filterFinancialStatus;
            return matchesSearch && matchesProject && matchesFinancial;
        });

        const getBeltColor = (beltId: string) => belts.find(b => b.id === beltId)?.color || '#fff';
        const getBeltName = (beltId: string) => belts.find(b => b.id === beltId)?.name || 'N/A';

        const handleOpenModal = (student?: Student) => {
            if (student) {
                setEditingStudent(student);
            } else {
                setEditingStudent({
                    name: '',
                    birthDate: '',
                    joinDate: new Date().toISOString().split('T')[0],
                    beltId: belts[0].id,
                    active: true,
                    project: false,
                    financialType: 'normal',
                    financialStatus: 'ok'
                });
            }
            setIsModalOpen(true);
        };

        const handleSave = () => {
            if (!editingStudent?.name || !editingStudent?.birthDate) {
                alert("Nome e Data de Nascimento são obrigatórios.");
                return;
            }

            if (editingStudent.id) {
                updateStudent(editingStudent.id, editingStudent);
            } else {
                addStudent(editingStudent as Omit<Student, 'id'>);
            }
            setIsModalOpen(false);
            setEditingStudent(null);
        };

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className={`text-3xl font-bold ${theme.text} brand-font`}>Gestão de Alunos</h2>
                        <p className="text-slate-500 text-sm">Total: {filteredStudents.length} alunos ativos</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all font-bold"
                    >
                        <Plus size={18} />
                        Novo Aluno
                    </button>
                </header>

                <Card className="p-0 overflow-hidden">
                    <div className={`p-4 border-b ${theme.border} flex flex-col md:flex-row gap-4 justify-between items-center`}>
                        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Buscar aluno..." 
                                    className={`w-full ${theme.input} border ${theme.border} rounded-lg pl-10 pr-4 py-2 ${theme.text} focus:outline-none focus:border-red-500 transition-colors`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <div className="relative w-full md:w-auto">
                                    <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
                                    <select
                                        className={`w-full md:w-auto appearance-none ${theme.input} border ${theme.border} rounded-lg pl-10 pr-8 py-2 text-sm ${theme.text} focus:outline-none focus:border-red-500 transition-colors cursor-pointer`}
                                        value={filterFinancialStatus}
                                        onChange={(e) => setFilterFinancialStatus(e.target.value)}
                                    >
                                        <option value="all">Todos Financeiros</option>
                                        <option value="ok">Em dia</option>
                                        <option value="late">Atrasado</option>
                                        <option value="exempt">Isento</option>
                                    </select>
                                </div>

                                <button 
                                    onClick={() => setFilterProject(!filterProject)}
                                    className={`px-3 py-2 rounded-lg border flex items-center gap-2 text-sm transition-colors whitespace-nowrap ${filterProject ? 'bg-red-600/20 border-red-600 text-red-500' : `${theme.bg} ${theme.border} text-slate-400 hover:text-red-400`}`}
                                >
                                    <Filter size={16} />
                                    Projeto Social
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`${theme.bg} text-slate-500 text-sm uppercase tracking-wider`}>
                                    <th className="p-4">Aluno</th>
                                    <th className="p-4">Faixa</th>
                                    <th className="p-4">Financeiro</th>
                                    <th className="p-4">Projeto</th>
                                    <th className="p-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme.border}`}>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-red-900/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className={`font-medium ${theme.text}`}>{student.name}</p>
                                                    <p className="text-xs text-slate-500">Desde {new Date(student.joinDate).getFullYear()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: getBeltColor(student.beltId) }} />
                                                <span className="text-sm text-slate-500">{getBeltName(student.beltId)}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                             {student.financialStatus === 'ok' && <span className="text-emerald-500 text-sm">Em dia</span>}
                                             {student.financialStatus === 'late' && <span className="text-red-500 text-sm font-bold flex items-center gap-1"><AlertTriangle size={12}/> Atrasado</span>}
                                             {student.financialStatus === 'exempt' && <span className="text-purple-400 text-sm">Isento</span>}
                                        </td>
                                        <td className="p-4">
                                            {student.project ? (
                                                <div className="flex flex-col">
                                                    <span className="bg-red-600/20 text-red-500 px-2 py-1 rounded text-xs w-fit border border-red-600/30">Beneficiário</span>
                                                    {student.grantEndDate && <span className="text-[10px] text-slate-500 mt-1">Até: {new Date(student.grantEndDate).toLocaleDateString()}</span>}
                                                </div>
                                            ) : <span className="text-slate-600 text-xs">-</span>}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleOpenModal(student)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-900/10 rounded transition">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => archiveStudent(student.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-900/10 rounded transition">
                                                    <Archive size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500">
                                            Nenhum aluno encontrado com os filtros selecionados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStudent?.id ? 'Editar Aluno' : 'Novo Aluno'}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Nome Completo</label>
                                <input type="text" className="w-full bg-black/20 border border-slate-700 rounded p-2 text-slate-200"
                                    value={editingStudent?.name || ''} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Data Nascimento</label>
                                <input type="date" className="w-full bg-black/20 border border-slate-700 rounded p-2 text-slate-200"
                                    value={editingStudent?.birthDate || ''} onChange={e => setEditingStudent({...editingStudent, birthDate: e.target.value})} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Faixa Atual</label>
                            <select className="w-full bg-black/20 border border-slate-700 rounded p-2 text-slate-200"
                                value={editingStudent?.beltId || ''} onChange={e => setEditingStudent({...editingStudent, beltId: e.target.value})}>
                                {belts.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Status Financeiro</label>
                            <select className="w-full bg-black/20 border border-slate-700 rounded p-2 text-slate-200"
                                value={editingStudent?.financialStatus || 'ok'} onChange={e => setEditingStudent({...editingStudent, financialStatus: e.target.value as any})}>
                                <option value="ok">Em dia</option>
                                <option value="late">Atrasado</option>
                                <option value="exempt">Isento</option>
                            </select>
                        </div>

                        <div className="p-3 border border-red-900/30 rounded bg-red-900/5">
                            <label className="flex items-center gap-2 cursor-pointer mb-2">
                                <input type="checkbox" className="accent-red-600"
                                    checked={editingStudent?.project || false} 
                                    onChange={e => setEditingStudent({...editingStudent, project: e.target.checked})} />
                                <span className="text-red-400 font-bold">Aluno de Projeto Social?</span>
                            </label>
                            {editingStudent?.project && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div>
                                        <label className="text-xs text-slate-500">Início Gratuidade</label>
                                        <input type="date" className="w-full bg-black/20 border border-slate-700 rounded p-1 text-sm text-slate-200"
                                            value={editingStudent?.grantStartDate || ''} onChange={e => setEditingStudent({...editingStudent, grantStartDate: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500">Fim Gratuidade</label>
                                        <input type="date" className="w-full md:flex-row bg-black/20 border border-slate-700 rounded p-1 text-sm text-slate-200"
                                            value={editingStudent?.grantEndDate || ''} onChange={e => setEditingStudent({...editingStudent, grantEndDate: e.target.value})} />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-4">SALVAR</button>
                    </div>
                </Modal>
            </div>
        );
    };