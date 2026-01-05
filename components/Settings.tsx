import React, { useState } from 'react';
import { Card } from './ui/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useDojo } from '../contexts/DojoContext';
import { ThemeType } from '../types';
import { Palette, Monitor, Database, Trash2, Table, CloudSync, Copy, CheckCircle, ExternalLink, Info } from 'lucide-react';

export const Settings: React.FC = () => {
    const { currentTheme, setTheme, getThemeClasses } = useTheme();
    const { 
        resetToDefault, 
        googleSheetsUrl, 
        setGoogleSheetsUrl, 
        syncWithGoogle, 
        isSyncing, 
        lastSync 
    } = useDojo();
    
    const theme = getThemeClasses();
    const [showInstructions, setShowInstructions] = useState(false);

    const themes: { id: ThemeType; name: string; color: string }[] = [
        { id: 'theme-1', name: 'Dark Void (Padrão)', color: '#020617' },
        { id: 'theme-2', name: 'Shadow', color: '#0f172a' },
        { id: 'theme-3', name: 'Iron', color: '#18181b' },
        { id: 'theme-4', name: 'Steel (Neutro)', color: '#292524' },
        { id: 'theme-5', name: 'Silver', color: '#e2e8f0' },
        { id: 'theme-6', name: 'Cloud', color: '#f3f4f6' },
        { id: 'theme-7', name: 'Light (Claro)', color: '#ffffff' },
    ];

    const gasCode = `function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('DojoBackup') || ss.insertSheet('DojoBackup');
  sheet.clear();
  sheet.getRange(1, 1).setValue(JSON.stringify(data));
  return ContentService.createTextOutput("OK");
}`;

    const handleCopyCode = () => {
        navigator.clipboard.writeText(gasCode);
        alert("Código copiado! Cole no Editor de Scripts da sua planilha.");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <header>
                <h2 className={`text-3xl font-bold ${theme.text} brand-font`}>Configurações</h2>
            </header>

            {/* Google Sheets Integration */}
            <Card className="border-t-4 border-t-emerald-600">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-600/10 rounded-lg text-emerald-500">
                            <Table size={24} />
                        </div>
                        <div>
                            <h3 className={`text-lg font-bold ${theme.text}`}>Integração Google Planilhas</h3>
                            <p className="text-slate-500 text-sm">Use seu Google Drive como banco de dados em nuvem.</p>
                        </div>
                    </div>
                    {lastSync && (
                        <div className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full flex items-center gap-2">
                            <CheckCircle size={12} className="text-emerald-500" />
                            Sincronizado: {new Date(lastSync).toLocaleString()}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">URL do Web App (Google Apps Script)</label>
                        <div className="flex flex-col md:flex-row gap-2">
                            <input 
                                type="url" 
                                placeholder="https://script.google.com/macros/s/.../exec"
                                className={`flex-1 ${theme.input} border ${theme.border} rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors`}
                                value={googleSheetsUrl}
                                onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                            />
                            <button 
                                onClick={syncWithGoogle}
                                disabled={isSyncing || !googleSheetsUrl}
                                className={`px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                                    isSyncing 
                                    ? 'bg-emerald-600/20 text-emerald-500 cursor-not-allowed' 
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20'
                                }`}
                            >
                                <CloudSync size={18} className={isSyncing ? 'animate-spin' : ''} />
                                {isSyncing ? 'SINCRONIZANDO...' : 'SINCRONIZAR AGORA'}
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="text-emerald-500 text-sm flex items-center gap-1 hover:underline font-medium"
                    >
                        <Info size={14} /> {showInstructions ? 'Ocultar instruções' : 'Como configurar minha planilha?'}
                    </button>

                    {showInstructions && (
                        <div className="bg-emerald-950/10 border border-emerald-500/20 p-4 rounded-lg space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <ol className="text-sm text-slate-400 space-y-3 list-decimal ml-4">
                                <li>Crie uma nova <strong>Planilha Google</strong> no seu Drive.</li>
                                <li>Vá em <strong>Extensões</strong> &gt; <strong>Apps Script</strong>.</li>
                                <li>Apague o código que estiver lá e cole o código abaixo:</li>
                            </ol>
                            
                            <div className="relative group">
                                <pre className="bg-black/40 p-3 rounded text-[11px] font-mono text-emerald-400 overflow-x-auto border border-emerald-500/10">
                                    {gasCode}
                                </pre>
                                <button 
                                    onClick={handleCopyCode}
                                    className="absolute top-2 right-2 p-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition opacity-0 group-hover:opacity-100"
                                    title="Copiar código"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>

                            <ol className="text-sm text-slate-400 space-y-3 list-decimal ml-4" start={4}>
                                <li>Clique no botão azul <strong>Implantar</strong> &gt; <strong>Nova implantação</strong>.</li>
                                <li>Selecione "App da Web", coloque "Qualquer pessoa" em quem pode acessar.</li>
                                <li>Clique em Implantar, autorize as permissões e <strong>copie a URL do App da Web</strong>.</li>
                                <li>Cole a URL no campo acima e clique em Sincronizar.</li>
                            </ol>
                        </div>
                    )}
                </div>
            </Card>

            <Card title="Aparência e Temas">
                <div className="flex items-center gap-3 mb-6">
                    <Palette className="text-red-500" size={24} />
                    <p className="text-slate-500">Selecione o tema visual da interface administrativa.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                                currentTheme === t.id
                                ? 'border-red-500 ring-2 ring-red-500/20 bg-red-500/5'
                                : 'border-slate-700 hover:border-slate-500'
                            }`}
                        >
                            <div className="w-full h-12 rounded-lg border border-slate-600 shadow-inner" style={{ backgroundColor: t.color }}></div>
                            <span className={`text-sm font-medium ${currentTheme === t.id ? 'text-red-500' : 'text-slate-400'}`}>
                                {t.name}
                            </span>
                        </button>
                    ))}
                </div>
            </Card>

            <Card title="Gerenciamento de Dados Locais">
                <div className="flex items-center gap-3 mb-6">
                    <Database className="text-red-500" size={24} />
                    <p className="text-slate-500">Controle o armazenamento local das informações.</p>
                </div>

                <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h4 className="font-bold text-red-500 flex items-center gap-2">
                            <Trash2 size={18} /> Zona de Perigo
                        </h4>
                        <p className="text-sm text-slate-500">Apagar todos os alunos e registros salvos neste navegador.</p>
                    </div>
                    <button 
                        onClick={resetToDefault}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold transition-all shadow-lg shadow-red-900/20"
                    >
                        LIMPAR TUDO
                    </button>
                </div>
            </Card>

            <Card title="Sobre o Sistema">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-red-600/10 rounded-full text-red-500">
                        <Monitor size={32} />
                    </div>
                    <div>
                        <h4 className={`text-lg font-bold ${theme.text}`}>DOJO CODEX Web Admin</h4>
                        <p className="text-slate-500">Versão 2026.1.0-alpha</p>
                        <p className="text-xs text-slate-600 mt-2">Dados armazenados localmente e sincronizados com a nuvem.</p>
                    </div>
                 </div>
            </Card>
        </div>
    );
};