import React from 'react';
import { Card } from './ui/Card';
import { useDojo } from '../contexts/DojoContext';
import { useTheme } from '../contexts/ThemeContext';
import { Users, TrendingUp, AlertCircle, Calendar, HeartHandshake } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
    const { students, transactions } = useDojo();
    const { getThemeClasses } = useTheme();
    const theme = getThemeClasses();

    // Stats
    const activeStudents = students.filter(s => s.active).length;
    const projectStudents = students.filter(s => s.project && s.active).length;
    const monthlyRevenue = transactions
        .filter(t => t.type === 'income' && t.status === 'paid')
        .reduce((acc, curr) => acc + curr.amount, 0);
    
    const gratuityValue = transactions
        .filter(t => t.origin === 'project' && t.status === 'exempt')
        .length * 150; // Estimativa de R$150 por aluno isento

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <h2 className={`text-3xl font-bold ${theme.text} brand-font`}>Painel de Comando</h2>
                <div className="text-sm text-red-500 border border-red-500/30 px-3 py-1 rounded bg-red-950/10">
                    v.2026.1 - ONLINE
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-red-600">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Alunos Ativos</p>
                            <h3 className={`text-3xl font-bold ${theme.text} mt-2`}>{activeStudents}</h3>
                        </div>
                        <div className="p-3 bg-red-600/10 rounded-lg text-red-500">
                            <Users size={24} />
                        </div>
                    </div>
                </Card>
                
                <Card className="border-l-4 border-l-red-600">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Receita Real</p>
                            <h3 className={`text-3xl font-bold ${theme.text} mt-2`}>R$ {monthlyRevenue.toFixed(2)}</h3>
                        </div>
                        <div className="p-3 bg-red-600/10 rounded-lg text-red-500">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-red-600">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Projeto Social</p>
                            <h3 className={`text-3xl font-bold ${theme.text} mt-2`}>{projectStudents}</h3>
                            <p className="text-xs text-slate-500 mt-1">Contrapartida: R$ {gratuityValue}</p>
                        </div>
                        <div className="p-3 bg-red-600/10 rounded-lg text-red-500">
                            <HeartHandshake size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-red-600">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Próximo Exame</p>
                            <h3 className={`text-xl font-bold ${theme.text} mt-2`}>15/Jul</h3>
                        </div>
                        <div className="p-3 bg-red-600/10 rounded-lg text-red-500">
                            <Calendar size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Frequência Semanal">
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Seg', active: 45 }, { name: 'Ter', active: 30 }, 
                                { name: 'Qua', active: 42 }, { name: 'Qui', active: 28 }, { name: 'Sex', active: 35 }
                            ]}>
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#ef4444', color: '#f1f5f9' }}
                                    cursor={{ fill: '#2a1010' }}
                                />
                                <Bar dataKey="active" fill="#dc2626" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Avisos Importantes">
                    <div className="space-y-4">
                        <div className={`flex items-center gap-4 p-4 rounded-lg border border-red-500/20 ${theme.bg}`}>
                            <AlertCircle className="text-red-500" size={24} />
                            <div>
                                <h4 className={`font-semibold ${theme.text}`}>Documentação Pendente</h4>
                                <p className="text-sm text-slate-500">3 alunos do Projeto Social precisam renovar atestado.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};