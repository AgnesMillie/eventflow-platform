import { RegisterForm } from './components/RegisterForm';

function App() {
  return (
    // O container principal define o fundo e a altura mínima do ecrã
    <main className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-screen w-full text-white">
      
      {/* O layout de duas colunas agora preenche o 'main' diretamente */}
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        
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
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

