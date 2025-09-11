import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, login, logout } = useAuth();

  // --- LINHA DE DIAGNÓSTICO ---
  // Esta linha irá mostrar-nos o estado do 'user' em cada renderização.
  console.log('App.tsx renderizando. O valor de "user" é:', user);

  return (
    <main className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-screen w-full flex items-center justify-center text-white lg:p-0 p-4">
      
      {user ? (
        <Dashboard user={user} onLogout={logout} />
      ) : (
        <AuthPage onLoginSuccess={login} />
      )}

    </main>
  );
}

export default App;
