import React from "react";

interface TodoInputProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ input, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="todo-container__form">
      <input
        type="text"
        value={input}
        onChange={onChange}
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoInput;
