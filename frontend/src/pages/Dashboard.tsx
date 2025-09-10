import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Event } from '../types/event';
import { EventCard } from '../components/EventCard';

const API_URL = 'http://localhost:3000';

interface DashboardProps {
  readonly onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  // Estados para gerir os eventos, o carregamento e os erros
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os eventos quando o componente é montado
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data);
      } catch (err) {
        setError('Não foi possível carregar os eventos. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEvents();
  }, []); // O array vazio [] garante que isto só executa uma vez

  return (
    <div className="w-full min-h-screen p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-sky-400">Event</span>Flow Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="bg-slate-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Logout
        </button>
      </header>

      <main>
        {isLoading && <p className="text-center text-slate-400">A carregar eventos...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        
        {!isLoading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center bg-slate-800/50 p-10 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">Nenhum evento encontrado</h2>
                <p className="text-slate-400">Parece que ainda não há eventos. Porque não cria o primeiro?</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

