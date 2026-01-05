import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-4 mt-8 border-t border-red-900/20 text-center">
            <p className="text-xs text-slate-500 font-medium tracking-wide">
                DOJO CODEX 2026 &copy; Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
                Criado por Decessars Monteiro – contato: decessars@gmail.com
            </p>
        </footer>
    );
};