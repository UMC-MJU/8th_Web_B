import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import ThemeToggle from "./ThemeToggle";

const Todo = () => {
  const { todos, dones, handleComplete, handleDelete } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">RUI TODO</h1>
      <ThemeToggle />
      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="rgb(7, 141, 7)"
          onClick={handleComplete}
        />
        <TodoList
          title="완료"
          todos={dones}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Todo;
