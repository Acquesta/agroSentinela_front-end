import { useState } from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function IconeDeInternet(){

    // Simulação da sua variável externa de sincronização
    const [isSyncingData, setIsSyncingData] = useState(true);
  
  // Chama o hook passando a dependência de sincronização
    const status = useNetworkStatus(isSyncingData);

    setIsSyncingData

    if(status == "online"){
        return <img src='./online.png' className='absolute h-10 w-10 right-5 top-5'></img>
    } else if(status == "offline"){
        return <img src='./offline.png' className='absolute h-10 w-10 right-5 top-5'></img> 
    } else {
        return <img src='./syncing.png' className='absolute h-10 w-10 right-5 top-5'></img>  
    }
   
      
}