// src/App.tsx
import React, { useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";

interface Task {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      setTodos([...todos, { id: Date.now(), text }]);
      setInput("");
    }
  };

  const handleComplete = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  const handleDelete = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">DD Todo</h1>
      <TodoInput
        input={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />

      <div className="render-container">
        <TodoList tasks={todos} onClick={handleComplete} />
        <DoneList tasks={doneTasks} onClick={handleDelete} />
      </div>
    </div>
  );
}

export default App;
