import { FormEvent, useState } from "react";
import { TTodo } from "../types/Todo";

const TodoBefore = () => {
    //총 3가지 상태가 필요 => 할 일 상태, 완료된 상태, 입력상태
    //따라서 밑에서 useState를 사용하여 상태를 선언
    const [todos, setTodos] = useState<TTodo[]>([ ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([ ]);
    const [input, setInput] = useState<string>('');

    // console.log('Input:', input);

    //e: FormEvent<HTMLFormElement> 이건 암기를 해줘야함 => 많이 쓰다보면 외워짐
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {

        e.preventDefault(); //할일 버튼을 눌렀을 때 새로고침 되는 것을 막기 위해
        // console.log('동작함');
        const text = input.trim();

        if(text) {
            const newTodo: TTodo = {id:Date.now(), text};
            //전개 연산자를 통해서 이전 값 모두 저장후 새로운 값을 추가
            setTodos((prevTodos):TTodo[] =>[...prevTodos, newTodo]);
            setInput('');
        }
    };

    const CompletTodo = (todo:TTodo):void => {
        setTodos((prevTodos):TTodo[] => 
            //filter은 true면 포함, false면 제외외
            //처리하려는 todo와 id가 다른 것만 남김김
            prevTodos.filter((t):boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos):TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo:TTodo):void => {
        setDoneTodos((prevDoneTodos):TTodo[] =>
            prevDoneTodos.filter((t):boolean => t.id !== todo.id));
    };

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">JM TODO</h1>
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

            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {/* todos인 이유는 많은 객체가 들어갈 수 있어서
                        todo인 이유는 한개만 들어갈 수 있어서 그냥 규칙임 */}
                        {todos.map((todo): any => (
                            // recat는 key를 기준으로 렌더링을 동작
                            // 따라서 key값을 설정해줘야됨.
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container_item-text">
                                    {todo.text}
                                </span>
                                <button 
                                onClick={():void => CompletTodo(todo)}
                                style={{
                                    backgroundColor: '#28a745',
                                }} className="render-container__item-button">
                                    완료
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id="done-list" className="render-container__list">
                        {doneTodos.map((done): any => (
                            <li key={done.id} className="render-container__item">
                                <span className="render-container_item-text">
                                    {done.text}
                                </span>
                                <button 
                                onClick={():void => deleteTodo(done)}
                                style={{
                                    backgroundColor: '#dc3545',
                                }} className="render-container__item-button">
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
};

export default TodoBefore;