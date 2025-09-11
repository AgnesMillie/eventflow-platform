import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Event } from '../types/event';
import { EventCard } from '../components/EventCard';
import { CreateEventModal } from '../components/CreateEventModal';

const API_URL = 'http://localhost:3000';

interface DashboardProps {
  readonly onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    void fetchEvents();
  }, [fetchEvents]);

  const handleEventCreated = () => {
    void fetchEvents();
  };

  return (
    <>
      <div className="w-full min-h-screen p-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-4xl font-bold text-white text-center sm:text-left">
            <span className="text-sky-400">Event</span>Flow Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Criar Novo Evento
            </button>
            <button
              onClick={onLogout}
              className="bg-slate-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </header>

        <main>
          {isLoading && <p className="text-center text-slate-400">A carregar eventos...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}
          
          {!isLoading && !error && (
            <>
              {events.length === 0 ? (
                <div className="text-center bg-slate-800/50 p-10 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-2">Nenhum evento encontrado</h2>
                  <p className="text-slate-400">Parece que ainda não há eventos. Clique em "Criar Novo Evento" para começar.</p>
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

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </>
  );
}

