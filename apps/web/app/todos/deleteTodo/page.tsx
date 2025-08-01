"use client";
import React, { useRef } from "react";
import { trpc } from "../../../utils/trpc";

const DeleteTodo = () => {
  const _idRef = useRef<HTMLInputElement>(null);
  const TodoToDelete = trpc.todo.deleteTodo.useMutation();
  const onClickHandler = () => {
    const id = _idRef.current?.value || "";
    TodoToDelete.mutate(id);
  };
  return (
    <div>
      <input ref={_idRef} placeholder="_Id of Todo to delete"></input>
      <br></br>
      <button onClick={onClickHandler}>delete</button>
      <br></br>
      <p>{JSON.stringify(TodoToDelete.data)}</p>
    </div>
  );
};

export default DeleteTodo;
