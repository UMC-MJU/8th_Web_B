import { TTodo } from "../types/Todo";

interface TodoListProps {
    title?: string;
    todos?: TTodo[];
    buttonLable: string;
    buttonColor: string;
    onClick: (todo: TTodo) => void;
}


const TodoList = ({
    title, 
    todos, 
    buttonColor, 
    buttonLable, 
    onClick
}:TodoListProps) => {
    return (
        <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
        <ul id="todo-list" className="render-container__list">
            {/* todos인 이유는 많은 객체가 들어갈 수 있어서
            todo인 이유는 한개만 들어갈 수 있어서 그냥 규칙임 */}
            {todos?.map((todo): any => (
                // recat는 key를 기준으로 렌더링을 동작
                // 따라서 key값을 설정해줘야됨.
                <li key={todo.id} className="render-container__item">
                    <span className="render-container_item-text">
                        {todo.text}
                    </span>
                    <button 
                    onClick={():void => onClick(todo) }
                    style={{
                        backgroundColor: buttonColor,
                    }} className="render-container__item-button">
                        {buttonLable}
                    </button>
                </li>
            ))}
        </ul>
    </div>
    
    );
} 

export default TodoList