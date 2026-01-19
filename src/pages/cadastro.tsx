import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Cadastro() {

    const navigate = useNavigate()

    function handleSubmit(event : any ) {
        event.preventDefault(); // 1. Impede a página de recarregar
        
        // Aqui você colocaria a lógica de validação de login (API)
        
        navigate("/home"); // 2. Navega para a home
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 py-10">
            <img src="./Group.png" alt="" className="h-auto w-[30%]" />
            <div className="w-full text-center" >
                <h1 className="text-3xl font-bold text-[#34393D]">AgroSentinela</h1>
                <h2 className="text-xl font-bold text-[#115830]">Controle de pragas</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-5 mt-5">
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Digite seu nome completo"
                    />
                    <Input
                        label="Email"
                        type="text"
                        placeholder="Digite seu melhor email"
                    />
                    <Input
                        label="Número"
                        type="text"
                        placeholder="Digite seu número"
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite uma senha"
                    />
                    <Input
                        label="Confirme sua senha"
                        type="password"
                        placeholder="Digite a mesma senha"
                    />
                    <div>
                        <Button name="Entrar" />
                        <Link to={'/'} className="mt-2 font-medium cursor-pointer hover:underline">Já tem conta? <span className="text-[#115830]">Entre!</span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}