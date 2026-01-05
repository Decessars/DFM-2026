import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, User, AuditLog, Belt, InventoryItem, Transaction, ExamEvent, ExamCandidate } from '../types';
import { STUDENTS, MOCK_USER, BELTS, INVENTORY, TRANSACTIONS, EXAM_EVENTS } from '../constants';

interface DojoContextType {
    currentUser: User;
    students: Student[];
    belts: Belt[];
    inventory: InventoryItem[];
    auditLogs: AuditLog[];
    transactions: Transaction[];
    examEvents: ExamEvent[];
    examCandidates: ExamCandidate[];
    googleSheetsUrl: string;
    isSyncing: boolean;
    lastSync: string | null;
    
    // Actions
    addStudent: (student: Omit<Student, 'id'>) => void;
    updateStudent: (id: string, data: Partial<Student>) => void;
    archiveStudent: (id: string) => void;
    addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
    updateInventoryItem: (id: string, data: Partial<InventoryItem>) => void;
    addExamEvent: (event: Omit<ExamEvent, 'id'>) => void;
    addExamCandidate: (candidate: Omit<ExamCandidate, 'id'>) => void;
    resetToDefault: () => void;
    setGoogleSheetsUrl: (url: string) => void;
    syncWithGoogle: () => Promise<void>;
}

const DojoContext = createContext<DojoContextType | undefined>(undefined);

const STORAGE_KEY = 'dojo_codex_data_v1';

export const DojoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const loadInitialData = (key: string, defaultValue: any) => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed[key] !== undefined ? parsed[key] : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        }
        return defaultValue;
    };

    const [currentUser] = useState<User>({ ...MOCK_USER, active: true });
    const [students, setStudents] = useState<Student[]>(() => loadInitialData('students', STUDENTS));
    const [belts] = useState<Belt[]>(BELTS);
    const [inventory, setInventory] = useState<InventoryItem[]>(() => loadInitialData('inventory', INVENTORY));
    const [transactions, setTransactions] = useState<Transaction[]>(() => loadInitialData('transactions', TRANSACTIONS));
    const [examEvents, setExamEvents] = useState<ExamEvent[]>(() => loadInitialData('examEvents', EXAM_EVENTS));
    const [examCandidates, setExamCandidates] = useState<ExamCandidate[]>(() => loadInitialData('examCandidates', []));
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadInitialData('auditLogs', []));
    
    // Cloud Sync State
    const [googleSheetsUrl, setGoogleSheetsUrlState] = useState<string>(() => loadInitialData('googleSheetsUrl', ''));
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSync, setLastSync] = useState<string | null>(() => loadInitialData('lastSync', null));

    useEffect(() => {
        const dataToSave = {
            students,
            inventory,
            transactions,
            examEvents,
            examCandidates,
            auditLogs,
            googleSheetsUrl,
            lastSync
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }, [students, inventory, transactions, examEvents, examCandidates, auditLogs, googleSheetsUrl, lastSync]);

    const setGoogleSheetsUrl = (url: string) => setGoogleSheetsUrlState(url);

    const syncWithGoogle = async () => {
        if (!googleSheetsUrl) return;
        setIsSyncing(true);
        try {
            const dataToSync = {
                students, inventory, transactions, examEvents, examCandidates, auditLogs
            };
            
            // Enviar para o Google Apps Script
            const response = await fetch(googleSheetsUrl, {
                method: 'POST',
                mode: 'no-cors', // Apps Script web apps usually need no-cors for simple POSTs
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSync)
            });

            setLastSync(new Date().toISOString());
            console.log("Sincronização enviada com sucesso");
        } catch (error) {
            console.error("Erro na sincronização:", error);
            alert("Erro ao conectar com a planilha. Verifique a URL.");
        } finally {
            setIsSyncing(false);
        }
    };

    const logAction = (action: string, entity: string, entityId: string, details: string) => {
        const newLog: AuditLog = {
            id: crypto.randomUUID(),
            action, entity, entityId, userId: currentUser.id, timestamp: new Date().toISOString(), details
        };
        setAuditLogs(prev => [newLog, ...prev]);
    };

    const addStudent = (data: Omit<Student, 'id'>) => {
        const newStudent: Student = { ...data, id: crypto.randomUUID() };
        setStudents(prev => [...prev, newStudent]);
        logAction('CREATE', 'Student', newStudent.id, `Created ${newStudent.name}`);
    };

    const updateStudent = (id: string, data: Partial<Student>) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
        logAction('UPDATE', 'Student', id, 'Updated student data');
    };

    const archiveStudent = (id: string) => {
        updateStudent(id, { active: false, archived: true });
        logAction('ARCHIVE', 'Student', id, 'Archived student');
    };

    const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
        const newItem = { ...item, id: crypto.randomUUID() };
        setInventory(prev => [...prev, newItem]);
    };

    const updateInventoryItem = (id: string, data: Partial<InventoryItem>) => {
        setInventory(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
    };

    const addExamEvent = (event: Omit<ExamEvent, 'id'>) => {
        setExamEvents(prev => [...prev, { ...event, id: crypto.randomUUID() }]);
    };

    const addExamCandidate = (candidate: Omit<ExamCandidate, 'id'>) => {
        setExamCandidates(prev => [...prev, { ...candidate, id: crypto.randomUUID() }]);
    };

    const resetToDefault = () => {
        if (window.confirm("Isso apagará todos os seus dados personalizados e voltará ao padrão de fábrica. Continuar?")) {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
        }
    };

    return (
        <DojoContext.Provider value={{
            currentUser, students, belts, inventory, transactions, auditLogs, examEvents, examCandidates,
            googleSheetsUrl, isSyncing, lastSync,
            addStudent, updateStudent, archiveStudent, addInventoryItem, updateInventoryItem, addExamEvent, addExamCandidate,
            resetToDefault, setGoogleSheetsUrl, syncWithGoogle
        }}>
            {children}
        </DojoContext.Provider>
    );
};

export const useDojo = () => {
    const context = useContext(DojoContext);
    if (context === undefined) throw new Error('useDojo must be used within a DojoProvider');
    return context;
};