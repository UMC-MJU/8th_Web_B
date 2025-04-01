import { createContext, useState, useContext, PropsWithChildren } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  dones: TTodo[];
  addTodo: (task: string) => void;
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [dones, setDones] = useState<TTodo[]>([]);

  const addTodo = (task: string): void => {
    const newItem: TTodo = { id: Date.now(), text: task.trim() };
    setTodos((todos) => [...todos, newItem]);
  };

  const handleComplete = (id: number) => {
    const item = todos.find((todo) => todo.id === id);
    if (!item) return;
    setTodos(todos.filter((todo) => todo.id !== id));
    setDones([...dones, item]);
  };

  const handleDelete = (id: number) => {
    setDones(dones.filter((done) => done.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, dones, addTodo, handleComplete, handleDelete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다."
    );
  return context;
};
