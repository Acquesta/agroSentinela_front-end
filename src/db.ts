// src/db.ts
import Dexie, { type Table } from 'dexie';

// --- 1. Tipagem dos Dados (TypeScript) ---
// Define o formato dos dados que vamos salvar.

export interface Fazenda {
  id?: number; // O '?' significa que é opcional na criação (o banco gera)
  nome: string;
  proprietario: string;
  localizacao: string; // Ex: "Sinop - MT"
}

export interface RegistroCampo {
  id?: number;
  fazendaId: number;
  tipo: 'PRAGA' | 'DOENCA' | 'CLIMA' | 'OUTRO';
  descricao: string;
  foto?: Blob; // O IndexedDB suporta arquivos (fotos) nativamente!
  dataCriacao: Date;
  latitude?: number;
  longitude?: number;
  
  // Controle de Sincronização
  statusSync: 'pending' | 'synced' | 'error';
}

// --- 2. A Classe do Banco de Dados ---
export class AgroSentinelaDB extends Dexie {
  // Declaração das tabelas para o TypeScript entender
  fazendas!: Table<Fazenda, number>; 
  registros!: Table<RegistroCampo, number>; 

  constructor() {
    super('AgroSentinelaDB');
    
    // --- 3. Definição do Esquema (Schema) ---
    // IMPORTANTE: Aqui você só coloca os campos que quer usar para BUSCA (filtros).
    // Não precisa listar todos os campos (como 'descricao' ou 'foto').
    this.version(1).stores({
      fazendas: '++id, nome', // ++id significa auto-incremento
      registros: '++id, fazendaId, tipo, dataCriacao, statusSync' 
    });
  }
}

// Exporta uma instância única do banco para usar no app todo
export const db = new AgroSentinelaDB();