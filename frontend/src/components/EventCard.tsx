import type { Event } from '../types/event';

interface EventCardProps {
  readonly event: Event;
}

// Função para formatar a data para um formato mais legível
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-sky-500/20">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-sky-400 mb-2">{event.name}</h3>
        <p className="text-slate-300 mb-4 h-24 overflow-hidden text-ellipsis">{event.description}</p>
        
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center text-slate-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-sky-500"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-sky-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

