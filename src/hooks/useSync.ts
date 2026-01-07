// src/hooks/useSync.ts
import { useState, useEffect } from 'react';
import { db } from '../db';
import { apiService } from '../apiService';
import { useLiveQuery } from 'dexie-react-hooks';

export function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Monitora quantos itens estão pendentes em tempo real
  // Isso é ótimo para mostrar um "badge" no ícone (ex: "3 pendentes")
  const pendentes = useLiveQuery(
    () => db.registros.where({ statusSync: 'pending' }).toArray()
  );

  const syncNow = async () => {
    if (isSyncing) return; // Evita rodar duas vezes ao mesmo tempo
    if (!pendentes || pendentes.length === 0) return;

    setIsSyncing(true);
    let totalSincronizado = 0;

    try {
      // Loop por cada registro pendente
      for (const registro of pendentes) {
        try {
          // 1. Tenta enviar para a API
          await apiService.enviarRegistro(registro);

          // 2. Se deu certo, atualiza o status LOCALMENTE
          if (registro.id) {
            await db.registros.update(registro.id, { 
              statusSync: 'synced' 
            });
            totalSincronizado++;
          }

        } catch (erroIndividual) {
          console.error(`Falha ao sincronizar registro ${registro.id}`, erroIndividual);
          // Aqui você poderia implementar uma lógica de "tentativas" (retry count)
          // Por enquanto, ele apenas continua pendente para a próxima vez.
        }
      }
    } finally {
      setIsSyncing(false);
      if (totalSincronizado > 0) {
        console.log(`🚀 Sincronização concluída: ${totalSincronizado} itens enviados.`);
      }
    }
  };

  // Efeito para escutar quando a internet volta
  useEffect(() => {
    const onOnline = () => {
      console.log('🌐 Conexão detectada! Iniciando sincronização...');
      syncNow();
    };

    window.addEventListener('online', onOnline);
    
    // Tenta sincronizar assim que o hook carrega (se tiver internet)
    if (navigator.onLine) {
      syncNow();
    }

    return () => window.removeEventListener('online', onOnline);
  }, [pendentes?.length]); // Roda novamente se a lista de pendentes mudar e tivermos internet

  return {
    isSyncing,
    countPendentes: pendentes?.length || 0,
    syncNow // Expomos a função caso o usuário queira forçar clicar num botão "Sincronizar"
  };
}