import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
}

interface TodoListProps {
  tasks: Task[];
  onClick: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onClick }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            buttonLabel="완료"
            buttonColor="#28a745"
            onClick={() => onClick(task)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
