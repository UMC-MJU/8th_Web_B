import React from "react";

interface Task {
  id: number;
  text: string;
}

interface TaskItemProps {
  task: Task;
  buttonLabel: string;
  buttonColor: string;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  buttonLabel,
  buttonColor,
  onClick,
}) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: buttonColor }}
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </li>
  );
};

export default TaskItem;
