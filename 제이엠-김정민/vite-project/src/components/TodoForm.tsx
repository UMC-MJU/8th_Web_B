import { FormEvent, useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
    const [input,setInput] = useState<string>('');
    const {addTodo} = useTodo();
    
        const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        
                e.preventDefault(); //할일 버튼을 눌렀을 때 새로고침 되는 것을 막기 위해
                // console.log('동작함');
                const text = input.trim();
        
                if(text) {
                    addTodo(text);
                    //이 부분을 context에서 addTodo라는 메서드로 대체할 것이다.
                    // const newTodo: TTodo = {id:Date.now(), text};
                    // //전개 연산자를 통해서 이전 값 모두 저장후 새로운 값을 추가
                    // setTodos((prevTodos):TTodo[] =>[...prevTodos, newTodo]);
    
                    setInput('');
                }
            };

    return (
        <form onSubmit={handleSubmit} className="todo-container__form">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                id="todo-input"
                className="todo-container__input"
                placeholder="할 일을 입력해주세요."
                required
            />
            <button type="submit" className="todo-container__button">
                Add
            </button>
        </form>
    )
}

export default TodoForm