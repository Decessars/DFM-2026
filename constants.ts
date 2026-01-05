import { Belt, ClassSession, EvaluationTemplate, InventoryItem, Student, Transaction, User, UserProfile, ExamEvent } from "./types";

export const MOCK_USER: User = {
    id: 'u1',
    name: 'Sensei Akira',
    email: 'akira@dojocodex.com',
    profile: UserProfile.ADMIN,
    avatarUrl: 'https://ui-avatars.com/api/?name=Sensei+Akira&background=b91c1c&color=fff',
    active: true
};

export const BELTS: Belt[] = [
    { id: 'b1', name: 'Branca', color: '#f8fafc', order: 1, minMonths: 0 },
    { id: 'b2', name: 'Azul', color: '#3b82f6', order: 2, minMonths: 6 },
    { id: 'b3', name: 'Amarela', color: '#eab308', order: 3, minMonths: 6 },
    { id: 'b4', name: 'Laranja', color: '#f97316', order: 4, minMonths: 6 },
    { id: 'b5', name: 'Verde', color: '#22c55e', order: 5, minMonths: 12 },
    { id: 'b6', name: 'Roxa', color: '#a855f7', order: 6, minMonths: 12 },
    { id: 'b7', name: 'Marrom', color: '#78350f', order: 7, minMonths: 24 },
    { id: 'b8', name: 'Preta', color: '#171717', order: 8, minMonths: 48 },
];

export const STUDENTS: Student[] = [
    { id: 's1', name: 'Lucas Silva', birthDate: '2010-05-12', joinDate: '2023-01-10', active: true, beltId: 'b2', project: false, financialType: 'normal', financialStatus: 'ok' },
    { id: 's2', name: 'Mariana Costa', birthDate: '2012-08-20', joinDate: '2023-03-15', active: true, beltId: 'b3', project: true, financialType: 'full_grant', grantStartDate: '2025-01-01', grantEndDate: '2025-12-31', financialStatus: 'exempt' },
    { id: 's3', name: 'Pedro Santos', birthDate: '2005-01-15', joinDate: '2020-05-20', active: true, beltId: 'b7', project: false, financialType: 'normal', financialStatus: 'late' },
];

export const CLASSES: ClassSession[] = [
    { id: 'c1', name: 'Infantil 1 (4-7 anos)', schedule: 'Seg/Qua 09:00', instructorId: 'u1' },
    { id: 'c2', name: 'Juvenil (8-14 anos)', schedule: 'Seg/Qua 18:00', instructorId: 'u1' },
    { id: 'c3', name: 'Adulto Avançado', schedule: 'Ter/Qui 20:00', instructorId: 'u1' },
];

export const TRANSACTIONS: Transaction[] = [
    { id: 't1', type: 'income', category: 'Mensalidade', amount: 150.00, date: '2025-05-01', status: 'paid', studentId: 's1' },
    { id: 't2', type: 'income', category: 'Mensalidade', amount: 0.00, date: '2025-05-01', status: 'exempt', origin: 'project', studentId: 's2' },
    { id: 't3', type: 'expense', category: 'Manutenção Tatame', amount: 450.00, date: '2025-05-05', status: 'paid' },
];

export const EVALUATION_TEMPLATES: EvaluationTemplate[] = [
    {
        id: 'tpl1',
        name: 'Avaliação Física - Judô Kids',
        type: 'physical',
        fields: [
            { id: 'f1', label: 'Polichinelos (1 min)', type: 'number', order: 1 },
            { id: 'f2', label: 'Abdominais (1 min)', type: 'number', order: 2 },
            { id: 'f3', label: 'Flexibilidade (cm)', type: 'number', order: 3 },
        ]
    }
];

export const INVENTORY: InventoryItem[] = [
    { id: 'i1', name: 'Kimono Trançado A2', category: 'kimono', quantity: 5, minQuantity: 3, location: 'Almoxarifado' },
    { id: 'i2', name: 'Faixa Branca - 2.5m', category: 'belt', quantity: 12, minQuantity: 10, location: 'Dojô' },
    { id: 'i3', name: 'Esparadrapo', category: 'equipment', quantity: 2, minQuantity: 5, location: 'Kit Primeiros Socorros' },
];

export const EXAM_EVENTS: ExamEvent[] = [
    { id: 'evt1', name: 'Exame de Faixa - Inverno 2035', date: '2035-07-15', location: 'Dojô Central', fee: 50.00 }
];