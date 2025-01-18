import { NextResponse } from 'next/server';

export async function GET() {

  const posts = [];

  for (let i = 1; i <= 5; i++) {
    posts.push({
      id: i,
      user: `user ${i}`,
      role: `role ${i}`,
      date: new Date(Date.now() - (i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Calcola una data scalata
    });
  }

  console.log(posts);

  await new Promise(resolve => setTimeout(resolve, 2000));

  return NextResponse.json(posts);
}
