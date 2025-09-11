import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';
const TOKEN_KEY = 'eventflow-auth-token';

interface EventFormData {
  name: string;
  description: string;
  date: string;
  location: string;
}

interface CreateEventModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onEventCreated: () => void;
}

export function CreateEventModal({ isOpen, onClose, onEventCreated }: CreateEventModalProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    date: '',
    location: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }
      
      await axios.post(`${API_URL}/events`, {
        ...formData,
        date: new Date(formData.date).toISOString(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onEventCreated();
      onClose();

    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error) && error.response) {
        const apiErrorMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(', ')
          : error.response.data.message;
        setMessage(apiErrorMessage || 'Ocorreu um erro ao criar o evento.');
      } else {
        setMessage('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-400">Criar Novo Evento</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-slate-400 mb-2">Nome do Evento</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 transition-colors duration-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Ex: Concerto de Verão"/>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-slate-400 mb-2">Descrição</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 transition-colors duration-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 h-24 resize-none" placeholder="Descreva o seu evento..."/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="date" className="block text-slate-400 mb-2">Data e Hora</label>
              <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 transition-colors duration-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 [color-scheme:dark]"/>
            </div>
            <div>
              <label htmlFor="location" className="block text-slate-400 mb-2">Localização</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 transition-colors duration-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Ex: Praça Central"/>
            </div>
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50">
            {isLoading ? 'A criar...' : 'Confirmar Evento'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 text-center p-3 rounded-lg text-sm ${isError ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}