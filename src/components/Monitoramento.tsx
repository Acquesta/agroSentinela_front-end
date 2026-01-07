// src/components/Monitoramento.tsx
import { useState } from 'react';
import { db } from '../db'; // Importe seu banco
import { useLiveQuery } from 'dexie-react-hooks'; // Hook mágico

export const Monitoramento = () => {
  const [tipo, setTipo] = useState('PRAGA');
  const [desc, setDesc] = useState('');

  // --- LEITURA (READ) ---
  // O useLiveQuery observa o banco. Se você adicionar um registro,
  // essa lista atualiza sozinha na tela (igual o React Query ou Firebase).
  const registros = useLiveQuery(
    () => db.registros.orderBy('dataCriacao').reverse().toArray()
  );

  // --- GRAVAÇÃO (WRITE) ---
  const salvarRegistro = async () => {
    try {
      // Note que não chamamos API aqui. Salvamos no Dexie.
      await db.registros.add({
        fazendaId: 1, // Exemplo fixo
        tipo: tipo as "PRAGA" | "DOENCA" | "CLIMA" | "OUTRO" ,
        descricao: desc,
        dataCriacao: new Date(),
        statusSync: 'pending', // <--- O segredo: nasce pendente
      });
      
      setDesc(''); // Limpa o input
      alert('Registro salvo localmente! 🚜');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Novo Registro de Campo</h2>
      
      {/* Formulário Simples */}
      <div className="flex flex-col gap-2 mb-6">
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border p-2">
          <option value="PRAGA">Praga</option>
          <option value="DOENCA">Doença</option>
          <option value="CLIMA">Clima</option>
        </select>
        
        <textarea 
          value={desc} 
          onChange={e => setDesc(e.target.value)} 
          placeholder="O que você viu?"
          className="border p-2"
        />
        
        <button 
          onClick={salvarRegistro}
          className="bg-green-600 text-white p-2 rounded font-bold"
        >
          SALVAR REGISTRO
        </button>
      </div>

      <hr />

      {/* Lista de Registros */}
      <h3 className="mt-4 font-bold">Histórico (Salvo no Celular)</h3>
      <ul>
        {registros?.map(reg => (
          <li key={reg.id} className="border-b p-2 flex justify-between">
            <span>{reg.tipo}: {reg.descricao}</span>
            <span className="text-xs">
              {reg.statusSync === 'pending' ? '⏳ Pendente' : '✅ Sincronizado'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};