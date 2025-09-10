// Esta interface deve corresponder à nossa Event entity no backend.
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // A data virá como uma string no formato ISO
  location: string;
  created_at: string;
  updated_at: string;
}
