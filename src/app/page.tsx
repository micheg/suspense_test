// app/page.tsx
import { Suspense } from 'react';
import { getUsers } from './actions/getUsers';
import UserListClient from './components/UserListClient';
import LoadingSpinner from './components/LoadingSpinner';
import ClientComponentWrapper from "./components/ClientComponentWrapper";
import {User} from './types';

export default async function Page() {
  const usersPromise = getUsers();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Dashboard</h1>
      <Suspense fallback={<LoadingSpinner />}>
        
        {/* Server Component che aspetta i dati */}
        {/* wrapper ad hoc */}
        {/* <ServerUserList usersPromise={usersPromise} /> *}

        {/* così non funziona perché i client side component non possono essere asincroni */}
        {/*<UserListClient users={await usersPromise} />*/}
        
        {/* wrapper generico */}
        <ClientComponentWrapper
          promise={usersPromise}
          Component={UserListClient}
          propName="users"
        />
      </Suspense>
    </main>
  );
}

// Componente Server per gestire il caricamento dei dati
async function ServerUserList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  const users = await usersPromise; // Aspetta il completamento della Promise
  return <UserListClient users={users} />; // Passa i dati al componente client
}

