"use client";

import { useRef } from "react";
import { trpc } from "../../../utils/trpc";

export default function Home() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const todoQuery = trpc.todo.createTodo.useMutation();

  if (todoQuery.isPending) return <div>Creating todos...</div>;
  const onClickHandler = () => {
    todoQuery.mutate({
      id: (Math.random() * 100).toFixed().toString(),
      title: titleRef.current?.value || "",
      description: descRef.current?.value || "",
    });
  };
  console.log(todoQuery);
  return (
    <div>
      <h1>Todo Created</h1>
      <input ref={titleRef} placeholder="Title:"></input>
      <br></br>
      <input ref={descRef} placeholder="Description: "></input>
      <br></br>
      <button onClick={onClickHandler}>create</button>
      <br></br>
      _Id: {todoQuery.data?._id}
      <br></br>
      Id: {todoQuery.data?.id}
      <br></br>
      Title: {todoQuery.data?.title}
      <br></br>
      Description: {todoQuery.data?.description}
      <br></br>
    </div>
  );
}
