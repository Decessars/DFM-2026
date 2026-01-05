// Enums e Tipos Globais

export enum UserProfile {
    ADMIN = 'ADMIN',
    SECRETARY = 'SECRETARY',
    PROFESSOR = 'PROFESSOR',
    FINANCE = 'FINANCE'
}

export type ThemeType = 'theme-1' | 'theme-2' | 'theme-3' | 'theme-4' | 'theme-5' | 'theme-6' | 'theme-7';

export interface User {
    id: string;
    name: string;
    email: string;
    profile: UserProfile;
    avatarUrl?: string;
    active: boolean;
}

export interface Belt {
    id: string;
    name: string;
    color: string;
    order: number;
    minMonths: number;
}

export interface Student {
    id: string;
    name: string;
    birthDate: string;
    active: boolean;
    beltId: string;
    photoUrl?: string;
    archived?: boolean;

    // Dados de Contato e Responsável
    phone?: string;
    email?: string;
    guardianName?: string;
    guardianPhone?: string;

    // Projeto Social / Beneficiário
    project: boolean; // participa_projeto
    financialType: 'normal' | 'full_grant' | 'partial_grant'; // tipo_vinculo_financeiro
    grantStartDate?: string;
    grantEndDate?: string;
    
    financialStatus: 'ok' | 'late' | 'exempt';
    
    // Saúde e Obs
    medicalNotes?: string;
    generalNotes?: string;
    joinDate: string;
}

export interface ClassSession {
    id: string;
    name: string;
    schedule: string;
    instructorId: string;
    maxCapacity?: number;
}

// Financeiro
export interface Transaction {
    id: string;
    studentId?: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending' | 'exempt';
    origin?: 'normal' | 'project';
}

// Bens / Inventário
export type InventoryCategory = 'kimono' | 'belt' | 'mat' | 'equipment' | 'pedagogical' | 'other';
export type InventoryMovementType = 'in' | 'out';

export interface InventoryItem {
    id: string;
    name: string;
    category: InventoryCategory;
    quantity: number;
    minQuantity: number;
    location: string;
    notes?: string;
}

export interface InventoryMovement {
    id: string;
    itemId: string;
    type: InventoryMovementType;
    quantity: number;
    date: string;
    reason: string;
    userId: string;
}

// Exames de Faixa
export interface ExamEvent {
    id: string;
    name: string;
    date: string;
    location: string;
    fee?: number;
}

export interface ExamCandidate {
    id: string;
    eventId: string;
    studentId: string;
    targetBeltId: string;
    approved: boolean | null; // null = pendente
    feedback?: string;
}

// Avaliação Flexível
export type EvaluationFieldType = 'number' | 'text' | 'scale_1_5' | 'boolean';

export interface EvaluationField {
    id: string;
    label: string;
    type: EvaluationFieldType;
    order: number;
}

export interface EvaluationTemplate {
    id: string;
    name: string;
    type: 'physical' | 'technical' | 'behavioral' | 'other';
    fields: EvaluationField[];
}

export interface AuditLog {
    id: string;
    action: string;
    entity: string;
    entityId: string;
    details: string;
    timestamp: string;
    userId: string;
}