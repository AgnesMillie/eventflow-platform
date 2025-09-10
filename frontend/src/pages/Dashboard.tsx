interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-sky-400 mb-4">Bem-vindo ao EventFlow!</h1>
      <p className="text-slate-300 text-lg mb-8">A sua sessão está ativa. Em breve, poderá ver e gerir os seus eventos aqui.</p>
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Terminar Sessão (Logout)
      </button>
    </div>
  );
}
