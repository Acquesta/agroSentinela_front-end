import { useNavigate } from "react-router-dom"

export function Login(){

    const navigate = useNavigate()

    function handleSubmit(event : any ) {
        event.preventDefault(); // 1. Impede a página de recarregar
        
        // Aqui você colocaria a lógica de validação de login (API)
        
        navigate("/home"); // 2. Navega para a home
    }

    return(
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <img src="./Group.png" alt="" className="h-auto w-[50%]"/>
            <div className="w-full h-1/2 text-center" >
                <h1 className="text-3xl font-bold text-[#34393D]">AgroSentinela</h1>
                <h2 className="text-xl font-bold text-[#115830]">Controle de pragas</h2>
                <form  onSubmit={handleSubmit} className="flex flex-col gap-5 px-5 mt-5">
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="" className="font-light text-lg">Email</label>
                        <input type="text" placeholder="Digite seu email" className="bg-slate-200 w-full py-3 px-2 rounded-xl border border-gray-500"/>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="" className="font-light text-lg">Senha</label>
                        <input type="password" placeholder="Digite sua senha" className="bg-slate-200 w-full py-3 px-2 rounded-xl border border-gray-500"/>
                    </div>
                    <div>
                        <button type="submit" className="bg-[#247240] w-full py-3 text-white font-bold rounded-xl cursor-pointer">
                            Entrar
                        </button>
                        <h2 className="mt-3 font-medium cursor-pointer hover:underline">Esqueceu a senha? <span className="text-[#115830]">Recupere!</span></h2>
                        <h2 className="mt-2 font-medium cursor-pointer hover:underline">Não tem conta? <span className="text-[#115830]">Cadastre-se!</span></h2>
                    </div>
                </form>
            </div>
        </div>
    )
}