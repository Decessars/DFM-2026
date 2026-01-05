import React from 'react';
import { Card } from './ui/Card';
import { TRANSACTIONS } from '../constants';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

export const Finance: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header>
                 <h2 className="text-3xl font-bold text-white brand-font">Financeiro</h2>
            </header>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-500 text-sm">
                                <th className="pb-3 pl-4">Data</th>
                                <th className="pb-3">Categoria</th>
                                <th className="pb-3">Tipo</th>
                                <th className="pb-3 text-right pr-4">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {TRANSACTIONS.map(t => (
                                <tr key={t.id} className="hover:bg-slate-900/50 transition-colors">
                                    <td className="py-4 pl-4 text-slate-300">{new Date(t.date).toLocaleDateString()}</td>
                                    <td className="py-4 text-slate-300">{t.category}</td>
                                    <td className="py-4">
                                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded w-fit ${
                                            t.type === 'income' 
                                            ? 'bg-emerald-500/10 text-emerald-400' 
                                            : 'bg-red-500/10 text-red-400'
                                        }`}>
                                            {t.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                            {t.type === 'income' ? 'RECEITA' : 'DESPESA'}
                                        </span>
                                    </td>
                                    <td className={`py-4 pr-4 text-right font-mono font-medium ${
                                        t.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                        R$ {t.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
