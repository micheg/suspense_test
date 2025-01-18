'use server';

import { User } from '../types';

export async function getUsers(): Promise<User[]> {  // Simula un ritardo
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Ritardo di 5 secondi

  // Fetch dati dall'API o database
  const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Errore durante il fetch dei dati');
  }

  return res.json();
}

