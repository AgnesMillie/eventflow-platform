import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// A "prop" para que o componente App possa dizer-nos quando o login teve sucesso
interface LoginFormProps {
  readonly onLoginSuccess: (token: string) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      setMessage('');
      onLoginSuccess(response.data.access_token);

    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || 'Ocorreu um erro no login.');
      } else {
        setMessage('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center mb-6">
        <div className="bg-gradient-to-r from-sky-500 to-cyan-400 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center text-slate-100">Bem-vindo de Volta</h2>
      <p className="text-slate-400 text-center mb-8">Faça login para continuar.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-400 mb-2" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300"
            required
            placeholder="o.seu@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-400 mb-2" htmlFor="login-password">Palavra-passe</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300"
            required
            placeholder="A sua palavra-passe"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'A entrar...' : 'Entrar'}
        </button>
      </form>

      {message && (
        <div className={`mt-6 text-center p-3 rounded-lg text-sm ${isError ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-green-900/50 text-green-300 border border-green-800'}`}>
          {message}
        </div>
      )}
    </div>
  );
}