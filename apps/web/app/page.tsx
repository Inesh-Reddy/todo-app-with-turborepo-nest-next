"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");

    ws.onopen = () => {
      console.log("WebSocket connected to ws://localhost:3000/ws");
    };

    ws.onmessage = (event) => {
      console.log("Raw WebSocket message:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed WebSocket data:", data);
        if (data.type === "todos") {
          setTodos(data.data);
          console.log("Todos state updated:", data.data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setTimeout(() => {
        console.log("Attempting WebSocket reconnection...");
      }, 5000);
    };

    return () => {
      ws.close();
      console.log("WebSocket closed");
    };
  }, []);

  return (
    <div>
      <h2>Todos (Updated: {new Date().toLocaleTimeString()}):</h2>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        todos.map((item: Todo) => (
          <div key={item.id}>
            <p>
              {item.title} : {item.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
