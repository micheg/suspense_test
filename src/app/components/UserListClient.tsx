// app/components/PostListClient.tsx
'use client';

import { useState } from 'react';
import { User } from '../types';

export default function UserListClient({ users }: { users: User[] }) {
  const [list, setList] = useState(users);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);

  const sortList = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedList = [...list].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setList(sortedList);
  };

  const getSortIndicator = (key: keyof User) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '|';
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => sortList('id')}
            >
              ID {getSortIndicator('id')}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => sortList('user')}
            >
              User {getSortIndicator('user')}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => sortList('role')}
            >
              Role {getSortIndicator('role')}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => sortList('date')}
            >
              Date {getSortIndicator('date')}
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((post) => (
            <tr key={post.id}>
              <td className="border border-gray-300 px-4 py-2">{post.id}</td>
              <td className="border border-gray-300 px-4 py-2">{post.user}</td>
              <td className="border border-gray-300 px-4 py-2">{post.role}</td>
              <td className="border border-gray-300 px-4 py-2">{post.date.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
