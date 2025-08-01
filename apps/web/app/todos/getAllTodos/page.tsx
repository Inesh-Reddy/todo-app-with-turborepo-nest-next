"use client";

import { trpc } from "../../../utils/trpc";

export default function Home() {
  const todoQuery = trpc.todo.getTodos.useQuery();

  if (todoQuery.isLoading) return <div>Loading todos...</div>;

  console.log(todoQuery);
  return (
    <div>
      <h1>All Todos</h1>
      {todoQuery.data?.map((item, index) => (
        <div key={index}>
          <p>{JSON.stringify(item)}</p>
        </div>
      ))}
    </div>
  );
}
