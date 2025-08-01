"use client";
import React, { useRef } from "react";
import { trpc } from "../../../utils/trpc";

const UpdateTodo = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const _idRef = useRef<HTMLInputElement>(null);
  const update = trpc.todo.updateTodo.useMutation();
  const onClickHandler = () => {
    const toUpdate = {
      _id: _idRef.current?.value || "",
      id: (Math.random() * 100).toFixed().toString(),
      title: titleRef.current?.value || "",
      description: descRef.current?.value || "",
    };
    update.mutate(toUpdate);
  };
  return (
    <div>
      <input ref={_idRef} placeholder="_id: "></input>
      <br></br>
      <input ref={titleRef} placeholder="Title:"></input>
      <br></br>
      <input ref={descRef} placeholder="Description: "></input>
      <br></br>
      <button onClick={onClickHandler}>update</button>
      <br></br>
      <h1>Updated Todo</h1>
      <p>{update.data?._id}</p>
      <p>{update.data?.id}</p>
      <p>{update.data?.title}</p>
      <p>{update.data?.description}</p>
    </div>
  );
};

export default UpdateTodo;
