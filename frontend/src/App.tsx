import { useState, useEffect } from 'react';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';

// A chave que usaremos para guardar o token no localStorage
const TOKEN_KEY = 'eventflow-auth-token';

function App() {
  // 1. Estado para guardar o token. Inicia como null.
  const [token, setToken] = useState<string | null>(null);

  // 2. useEffect: Executa UMA VEZ quando a aplicação carrega.
  useEffect(() => {
    // Tenta ler o token do localStorage.
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      // Se encontrar um token, atualiza o nosso estado.
      setToken(storedToken);
    }
  }, []); // O array vazio [] garante que isto só executa na montagem inicial.

  const handleLoginSuccess = (newToken: string) => {
    // 3. Quando o login tem sucesso:
    // a) Guarda o token no localStorage para persistir a sessão.
    localStorage.setItem(TOKEN_KEY, newToken);
    // b) Atualiza o estado do token, o que fará a página mudar para o Dashboard.
    setToken(newToken);
  };

  const handleLogout = () => {
    // 4. Quando o utilizador faz logout:
    // a) Remove o token do localStorage.
    localStorage.removeItem(TOKEN_KEY);
    // b) Define o estado do token como null, o que fará a página mudar para a AuthPage.
    setToken(null);
  };

  return (
    // O container principal define o fundo
    <main className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-screen w-full flex items-center justify-center text-white lg:p-0 p-4">
      
      {/* 5. Renderização Condicional */}
      {/* Se existe um token, mostra o Dashboard. Se não, mostra a AuthPage. */}
      {token ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}

    </main>
  );
}

export default App;

