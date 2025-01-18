# Tutorial: How to Use Suspense in Next.js with Client-Side Components

In this tutorial, we will explore how to effectively use `Suspense` in Next.js with Client-Side Components. We will walk through a practical example where data is fetched server-side and passed to a client-side component for display.

## Prerequisites

- Basic understanding of React and Next.js.
- Next.js 14 with the `src/app` directory structure.
- Familiarity with React Server Components (RSC).

---

## What is Suspense?

`Suspense` is a React feature that lets you "wait" for something (like data fetching) and display a fallback UI while waiting. In Next.js, it can be used both with Server Components and Client-Side Components.

---

## The Goal

We’ll create a blog page where:
1. Data is fetched server-side using a Server Action.
2. The data is passed to a Client-Side Component that simply displays the posts.
3. While the data is being fetched, a fallback spinner is displayed using `Suspense`.

---

## Step 1: Setup Your Project
Ensure you have a Next.js project with the `experimental.serverActions` feature enabled.

### Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverActions: true
};

export default nextConfig;
```
On earlier versions of nextjs (e.g. 13) you may need to use such a configuration:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
```
Restart your development server:

```bash
npm run dev
```

---

## Step 2: Create a Server Action for Data Fetching

We’ll define a Server Action that simulates fetching blog posts, including a delay to demonstrate `Suspense`.

### File: `app/actions/getPosts.ts`

```typescript
'use server';

import { Post } from '../types';

export async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

  return [
    { id: 1, title: "Post 1", body: "Content of post 1", date: "2025-01-18" },
    { id: 2, title: "Post 2", body: "Content of post 2", date: "2025-01-17" },
    { id: 3, title: "Post 3", body: "Content of post 3", date: "2025-01-16" },
    { id: 4, title: "Post 4", body: "Content of post 4", date: "2025-01-15" },
    { id: 5, title: "Post 5", body: "Content of post 5", date: "2025-01-14" },
  ];
}
```

### Explanation:

- **`'use server'`**: This directive ensures that the function is executed exclusively on the server. This is crucial in a Suspense setup because the server is responsible for fetching the data asynchronously before sending the rendered result to the client. By keeping this function server-side, we optimize performance and avoid unnecessary client-side fetch operations, adhering to the architecture of React Server Components.: This directive specifies that the function will only run on the server.
- **Simulated Delay**: A 3-second delay is added using `setTimeout` to mimic a real-world scenario where data takes time to load.
- **Data Structure**: The function returns an array of posts, each with an `id`, `title`, `body`, and `date` field.

---

## Step 3: Create the Client-Side Component

This component will simply display the list of posts passed from the server.

### File: `app/components/PostListClient.tsx`

```tsx
'use client';

import { Post } from '../types';

export default function PostListClient({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="mb-4">
          <h3 className="font-semibold text-lg">{post.title}</h3>
          <p>{post.body}</p>
          <small className="text-gray-500">{post.date}</small>
        </div>
      ))}
    </div>
  );
}
```

### Explanation:

- **Props**: The component receives the `posts` array as a prop. This separation of concerns allows the client-side component to focus solely on rendering data, while the server handles fetching. By keeping the data fetching server-side, we ensure better performance, improved security (as no API keys or sensitive logic are exposed), and alignment with React Server Components' architecture. The client component complements this by providing an interactive, lightweight layer for displaying the data.
- **Rendering**: It maps through the `posts` array, rendering each post with its `title`, `body`, and `date`.
- **Simple Layout**: Each post is wrapped in a `<div>` with basic styling for clarity.

---

## Step 4: Use `Suspense` in the Page Component

The page will use `Suspense` to fetch data via the Server Action and display a loading spinner while waiting.

### File: `app/page.tsx`

```tsx
import { Suspense } from 'react';
import { getPosts } from './actions/getPosts';
import PostListClient from './components/PostListClient';

function LoadingSpinner() {
  return <div>Loading...</div>;
}

export default async function Page() {
  const postsPromise = getPosts();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ServerPostList postsPromise={postsPromise} />
      </Suspense>
    </main>
  );
}

async function ServerPostList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  const posts = await postsPromise;
  return <PostListClient posts={posts} />;
}
```

### Explanation:

1. **`Suspense`**:
   - Wraps the `ServerPostList` component and displays `LoadingSpinner` while data is being fetched. `Suspense` works by deferring the rendering of components until the data they depend on is available. The fallback UI, like `LoadingSpinner`, provides a seamless experience for the user while waiting.
2. **`getPosts`**:
   - The `getPosts` function is called and returns a Promise. By returning a Promise, it enables React to pause rendering until the data is ready, ensuring a consistent and efficient data-fetching strategy.
3. **Why a Wrapper is Necessary**:
   - The `ServerPostList` wrapper acts as an intermediary between the server-side data fetching and the client-side rendering. Since Suspense can only "suspend" rendering for server-side or asynchronous operations, the wrapper ensures that the Client Component (`PostListClient`) receives pre-fetched data. This separation leverages React's ability to fetch data server-side while keeping client-side components lightweight and focused solely on rendering.
4. **`ServerPostList`**:
   - Waits for the `postsPromise` to resolve using `await`.
   - Passes the resolved data to the `PostListClient` component for rendering.

---

## Try It Out

1. Start your development server: `npm run dev`.
2. Open the page in your browser. You should see the loading spinner for 3 seconds, followed by a list of posts.

---

With this setup, you can effectively use `Suspense` to handle server-side fetching and client-side rendering in Next.js!


