import TodoList from './TodoList'
import TodoForm from './TodoForm';
import { FormEvent, useState } from 'react';
import { TTodo } from '../types/Todo';


const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([ ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([ ]);
    const [input,setInput] = useState<string>('');

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


    return(
        <div className="todo-container">
            <h1 className="todo-container__header">JM TODO</h1>
            <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit}/>
            <div className="render-container">
                <TodoList 
                title='할 일' 
                todos={todos} 
                buttonLable='완료' 
                buttonColor='#28a745'
                onClick={CompletTodo}
                />
                <TodoList 
                title='완료' 
                todos={doneTodos} 
                buttonLable='삭제' 
                buttonColor='#dc3545' 
                onClick={deleteTodo}
                />
            </div>
        </div>
    );
}

export default Todo;