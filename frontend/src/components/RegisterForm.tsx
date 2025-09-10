import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export function RegisterForm() {
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
      // CORREÇÃO AQUI: Removido o underscore extra de API__URL
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });
      setMessage(`Utilizador ${response.data.email} registado com sucesso!`);
      setEmail('');
      setPassword('');
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error) && error.response) {
        const apiErrorMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(', ')
          : error.response.data.message;
        setMessage(apiErrorMessage || 'Ocorreu um erro no registo.');
      } else {
        setMessage('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // O container exterior foi removido. Este componente agora só contém os elementos do formulário.
    <div className="w-full">
      {/* Ícone */}
      <div className="w-full flex justify-center mb-6">
        <div className="bg-gradient-to-r from-sky-500 to-cyan-400 p-3 rounded-full">
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center text-slate-100">Crie a sua Conta</h2>
      <p className="text-slate-400 text-center mb-8">Comece a gerir os seus eventos.</p>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-400 mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300"
            required
            placeholder="o.seu@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-400 mb-2" htmlFor="password">Palavra-passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300"
            required
            minLength={8}
            placeholder="Mínimo 8 caracteres"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'A registar...' : 'Criar Conta'}
        </button>
      </form>

      {/* Mensagem de Feedback */}
      {message && (
        <div className={`mt-6 text-center p-3 rounded-lg text-sm ${isError ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-green-900/50 text-green-300 border border-green-800'}`}>
          {message}
        </div>
      )}
    </div>
  );
}