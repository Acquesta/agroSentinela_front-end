import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';

export function AppRoutes() {
  return (
    <div className='h-screen bg-slate-100'>
        <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rota para página 404 (opcional) */}
        <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </div>
  );
}