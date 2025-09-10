import { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { LoginForm } from '../components/LoginForm';
import { AuthFormToggle } from '../components/AuthFormToggle';

interface AuthPageProps {
  onLoginSuccess: (token: string) => void;
}

export function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    // Card principal com layout de duas colunas
    <div className="w-full max-w-5xl lg:max-w-full lg:h-screen mx-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl lg:rounded-none shadow-2xl overflow-hidden border border-slate-700 lg:border-none">
      
      {/* Coluna Esquerda: Branding & Informação */}
      <div className="p-10 md:p-12 lg:p-20 bg-slate-800/30 backdrop-blur-sm hidden md:flex flex-col justify-center">
        <div className="mb-6">
          <div className="bg-gradient-to-r from-sky-500 to-cyan-400 w-16 h-16 flex items-center justify-center rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">EventFlow</h1>
        <p className="text-slate-300 text-lg lg:text-xl">A sua plataforma completa para criar, gerir e descobrir eventos incríveis.</p>
      </div>

      {/* Coluna Direita: Formulário */}
      <div className="p-8 md:p-12 lg:p-20 bg-slate-800/50 backdrop-blur-sm flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          {isLoginView ? (
            <LoginForm onLoginSuccess={onLoginSuccess} />
          ) : (
            <RegisterForm />
          )}
          
          <AuthFormToggle 
            isLoginView={isLoginView}
            toggleView={() => setIsLoginView(!isLoginView)}
          />
        </div>
      </div>
    </div>
  );
}
