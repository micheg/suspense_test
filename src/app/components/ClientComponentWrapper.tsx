import React from 'react';

interface ClientComponentWrapperProps<T, K extends string> {
  promise: Promise<T>;
  Component: React.ComponentType<{ [key in K]: T }>;
  propName: K;
  fallback?: React.ReactNode;
}

export default async function ClientComponentWrapper<T, K extends string>({
  promise,
  Component,
  propName,
  fallback,
}: ClientComponentWrapperProps<T, K>) {
  try {
    const data = await promise;

    // Forza l'oggetto props a includere esplicitamente la chiave
    const props = { [propName]: data } as { [key in K]: T };

    return <Component {...props} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return fallback || <div>Error loading data. Please try again later.</div>;
  }
}
