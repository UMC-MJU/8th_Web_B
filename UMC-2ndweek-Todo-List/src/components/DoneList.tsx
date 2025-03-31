import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
}

interface DoneListProps {
  tasks: Task[];
  onClick: (task: Task) => void;
}

const DoneList: React.FC<DoneListProps> = ({ tasks, onClick }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            buttonLabel="삭제"
            buttonColor="#dc3545"
            onClick={() => onClick(task)}
          />
        ))}
      </ul>
    </div>
  );
};

export default DoneList;
