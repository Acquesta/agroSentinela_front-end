// src/components/Monitoramento.tsx
import { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSync } from '../hooks/useSync'; // <--- 1. Importe o Hook

export const Monitoramento = () => {
  const [tipo, setTipo] = useState('PRAGA');
  const [desc, setDesc] = useState('');
  
  // --- 2. Use o Hook ---
  const { isSyncing, countPendentes, syncNow } = useSync();

  const registros = useLiveQuery(
    () => db.registros.orderBy('dataCriacao').reverse().toArray()
  );

  const salvarRegistro = async () => {
    if (!desc) return;
    try {
      await db.registros.add({
        fazendaId: 1,
        tipo: tipo as 'PRAGA' | 'DOENCA' | 'CLIMA' | 'OUTRO',
        descricao: desc,
        dataCriacao: new Date(),
        statusSync: 'pending',
      });
      setDesc('');
      // O hook useSync vai detectar a mudança no banco e tentar enviar automaticamente
      // se houver internet.
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* --- BARRA DE STATUS DE SINCRONIZAÇÃO --- */}
      <div className="bg-gray-100 p-3 rounded-lg mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-bold text-gray-700">Status da Nuvem</p>
          <p className="text-xs text-gray-500">
            {countPendentes === 0 
              ? "Tudo atualizado" 
              : `${countPendentes} itens aguardando envio`}
          </p>
        </div>
        
        <button 
          onClick={syncNow}
          disabled={isSyncing || countPendentes === 0}
          className={`p-2 rounded-full ${isSyncing ? 'animate-spin bg-blue-100' : 'bg-white shadow'}`}
        >
          {isSyncing ? '🔄' : '☁️'}
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Novo Registro</h2>
      
      <div className="flex flex-col gap-3 mb-6">
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border p-3 rounded">
          <option value="PRAGA">🦗 Praga</option>
          <option value="DOENCA">🍂 Doença</option>
          <option value="CLIMA">⛈️ Clima</option>
        </select>
        
        <textarea 
          value={desc} 
          onChange={e => setDesc(e.target.value)} 
          placeholder="O que você observou no campo?"
          className="border p-3 rounded h-24"
        />
        
        <button 
          onClick={salvarRegistro}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold transition-colors"
        >
          SALVAR NO DISPOSITIVO
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold mb-3 text-gray-700">Histórico Recente</h3>
        <ul className="space-y-2">
          {registros?.map(reg => (
            <li key={reg.id} className="bg-white border p-3 rounded shadow-sm flex justify-between items-center">
              <div>
                <span className="font-semibold block text-sm">{reg.tipo}</span>
                <span className="text-gray-600 text-sm">{reg.descricao}</span>
              </div>
              <div className="flex flex-col items-end">
                 {/* Indicador visual individual */}
                 {reg.statusSync === 'synced' 
                   ? <span className="text-green-500 text-xs font-bold flex items-center gap-1">✅ Enviado</span>
                   : <span className="text-orange-500 text-xs font-bold flex items-center gap-1">⏳ Pendente</span>
                 }
                 <span className="text-[10px] text-gray-400">
                   {reg.dataCriacao.toLocaleTimeString()}
                 </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};