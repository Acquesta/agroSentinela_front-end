// src/apiService.ts
import { type RegistroCampo } from './db';

// Simula uma chamada ao servidor (ex: Node.js/Java/Python)
export const apiService = {
  enviarRegistro: async (registro: RegistroCampo): Promise<boolean> => {
    console.log(`📡 Enviando para nuvem: ${registro.descricao}...`);
    
    // Simula um delay de rede (1.5 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simula sucesso (em um app real, aqui seria um fetch/axios)
    // Se quiser testar falha, mude para Math.random() > 0.5
    const sucesso = true; 
    
    if (sucesso) {
      console.log(`✅ Servidor recebeu: ID ${registro.id}`);
      return true;
    } else {
      throw new Error('Erro no servidor 500');
    }
  }
};