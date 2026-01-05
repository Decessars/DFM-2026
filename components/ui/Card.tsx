import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
    const { getThemeClasses } = useTheme();
    const theme = getThemeClasses();

    return (
        <div className={`${theme.card} backdrop-blur-md border ${theme.border} rounded-xl p-6 shadow-xl transition-colors duration-500 ${className}`}>
            {(title || action) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3 className="text-lg font-bold text-red-500 brand-font tracking-wide uppercase">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className={theme.text}>
                {children}
            </div>
        </div>
    );
};
