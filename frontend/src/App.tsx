import { useState } from 'react';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { AuthFormToggle } from './components/AuthFormToggle';

function App() {
  // Estado para controlar se estamos a ver o formulário de login ou registo
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLoginSuccess = (token: string) => {
    // Por agora, vamos apenas mostrar um alerta e o token na consola.
    // Na próxima fase, guardaremos o token e redirecionaremos o utilizador.
    alert('Login bem-sucedido!');
    console.log('Token de Acesso:', token);
  };

  return (
    <main className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-screen w-full flex items-center justify-center text-white lg:p-0 p-4">
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 md:p-12 lg:p-20 bg-slate-800/30 backdrop-blur-sm hidden md:flex flex-col justify-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-sky-500 to-cyan-400 w-16 h-16 flex items-center justify-center rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">EventFlow</h1>
          <p className="text-slate-300 text-lg lg:text-xl">A sua plataforma completa para criar, gerir e descobrir eventos incríveis.</p>
        </div>

        <div className="p-8 md:p-12 lg:p-20 bg-slate-800/50 backdrop-blur-sm flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Renderização condicional: mostra o Login ou o Registo */}
            {isLoginView ? (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
              <RegisterForm />
            )}
            
            {/* Componente para alternar entre as visualizações */}
            <AuthFormToggle 
              isLoginView={isLoginView}
              toggleView={() => setIsLoginView(!isLoginView)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;