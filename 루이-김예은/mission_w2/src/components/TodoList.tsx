import { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (id: number) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
}: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {todos.map((item) => (
          <li key={item.id} className="render-container__item">
            <p className="render-container__item-text">{item.text}</p>
            <button
              className="render-container__item-button"
              style={{ backgroundColor: buttonColor }}
              onClick={(): void => onClick(item.id)}
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
