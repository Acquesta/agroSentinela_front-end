import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import Home from '../pages/home';
import { useEffect, useState } from 'react';
import IconeDeInternet from '../components/IconeDeInternet';

export function AppRoutes() {

  const [onOnline, setOnline] = useState(false)

  const toggleOnline = () => {
    setOnline(!onOnline)
  }

  useEffect(() => {
    window.addEventListener('online', toggleOnline);
  })

  return (
    <div className='h-screen bg-slate-100'>
      <IconeDeInternet/>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      
      {/* Rota para página 404 (opcional) */}
      <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}