import React, { useState } from "react";
import { TTodo } from "../types/todo";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [dones, setDones] = useState<TTodo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newItem: TTodo = { id: Date.now(), text: task.trim() };
    setTodos((todos) => [...todos, newItem]);
    setTask("");
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
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <form className="todo-container__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            {todos.map((item) => (
              <li key={item.id} className="render-container__item">
                <p className="render-container__item-text">{item.text}</p>
                <button
                  className="render-container__item-button"
                  onClick={() => handleComplete(item.id)}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul className="render-container__list">
            {dones.map((item) => (
              <li key={item.id} className="render-container__item">
                <p className="render-container__item-text">{item.text}</p>
                <button
                  className="render-container__item-button delete"
                  style={{ backgroundColor: "#dc3545" }}
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
