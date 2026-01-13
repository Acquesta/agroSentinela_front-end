import { useState, useEffect } from 'react';

// Definindo os tipos possíveis para o status
type ConnectionState = 'offline' | 'online' | 'syncing';

export const useNetworkStatus = (isExternalSyncing: boolean): ConnectionState => {
  // 1. Inicializa com o estado real do navegador (não false fixo)
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // Funções específicas para garantir o estado correto
    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);

    // 2. Adiciona os ouvintes para ambos os eventos
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    // 3. Cleanup: Remove os ouvintes quando o componente desmontar
    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []); // Array vazio garante que roda apenas na montagem

  // 4. Lógica de decisão do status (Hierarquia de estados)
  if (!isOnline) {
    return 'offline';
  }
  
  // Se está online E a variável externa diz que está sincronizando
  if (isExternalSyncing) {
    return 'syncing';
  }

  return 'online';
};