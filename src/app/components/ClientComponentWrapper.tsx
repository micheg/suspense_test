import React from 'react';

interface ClientComponentWrapperProps<T> {
  promise: Promise<T>;
  Component: React.ComponentType<{ [key: string]: T }>;
  propName: string;
  fallback?: React.ReactNode; // Fallback opzionale per gestire gli errori
}

export default async function ClientComponentWrapper<T>({
  promise,
  Component,
  propName,
  fallback,
}: ClientComponentWrapperProps<T>) {
  try {
    const data = await promise;

    // Crea un oggetto dinamico con la propName specificata
    const props = { [propName]: data };

    return <Component {...props} />;
  } catch (error) {
    console.error('Error fetching data:', error);

    // Mostra il fallback personalizzato, se fornito; altrimenti un messaggio di default
    return (
      <div>
        {fallback || <div>Error loading data. Please try again later.</div>}
      </div>
    );
  }
}
