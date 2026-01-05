import React from 'react';
import { Card } from './ui/Card';
import { useDojo } from '../contexts/DojoContext';
import { useTheme } from '../contexts/ThemeContext';
import { AlertTriangle, Package, MapPin, ArrowRightLeft } from 'lucide-react';

export const Inventory: React.FC = () => {
    const { inventory } = useDojo();
    const { getThemeClasses } = useTheme();
    const theme = getThemeClasses();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <h2 className={`text-3xl font-bold ${theme.text} brand-font`}>Bens & Inventário</h2>
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-700">
                    <ArrowRightLeft size={16} /> Movimentação
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map(item => {
                    const isLowStock = item.quantity <= item.minQuantity;
                    return (
                        <Card key={item.id} className={`${isLowStock ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : ''}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-slate-400">
                                    <Package size={24} />
                                </div>
                                {isLowStock && (
                                    <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-950/50 px-2 py-1 rounded border border-red-900">
                                        <AlertTriangle size={12} /> BAIXO
                                    </span>
                                )}
                            </div>
                            
                            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>{item.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs uppercase bg-slate-800 px-2 py-1 rounded text-slate-400">{item.category}</span>
                                <span className="text-xs flex items-center gap-1 text-slate-500"><MapPin size={10}/> {item.location}</span>
                            </div>
                            
                            <div className="flex justify-between items-end border-t border-slate-800 pt-4">
                                <div>
                                    <p className="text-xs text-slate-500">Quantidade</p>
                                    <p className={`text-2xl font-bold ${isLowStock ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500">Mínimo</p>
                                    <p className="text-sm font-medium text-slate-400">{item.minQuantity}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
