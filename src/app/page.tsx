// app/page.tsx
import { Suspense } from 'react';
import { getUsers } from './actions/getUsers';
import UserListClient from './components/UserListClient';
import LoadingSpinner from './components/LoadingSpinner';
import {User} from './types';

export default async function Page() {
  const usersPromise = getUsers();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Dashboard</h1>
      <Suspense fallback={<LoadingSpinner />}>
        {/* Server Component che aspetta i dati */}
        <ServerUserList usersPromise={usersPromise} />
      </Suspense>
    </main>
  );
}

// Componente Server per gestire il caricamento dei dati
async function ServerUserList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  const users = await usersPromise; // Aspetta il completamento della Promise
  return <UserListClient users={users} />; // Passa i dati al componente client
}

