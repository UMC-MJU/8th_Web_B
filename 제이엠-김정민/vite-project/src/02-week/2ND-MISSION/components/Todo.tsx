import TodoList from './TodoList'
import TodoForm from './TodoForm';
// import { FormEvent, useContext, useState } from 'react';
// import { TTodo } from '../types/Todo';
import { useTodo } from '../context/TodoContext';

const Todo = () => {
    //useTodo를 통해 사용하는 모든 컴포넌트를 감싸준다.
    const {todos, completeTodo, deleteTodo, doneTodos} = useTodo();

    return(
        <div className="todo-container">
            <h1 className="todo-container__header">JM TODO</h1>
            <TodoForm/>
            <div className="render-container">
                <TodoList 
                title='할 일' 
                //처음 todos를 선언할 때 값이 무조건 있다고 선언해서 오류가 발생
                //선언 부분에서 ?를 통해 undefinded도 가능하게 해주면 오류가 해결됨
                todos={todos} 
                buttonLable='완료' 
                buttonColor='#28a745'
                onClick={completeTodo}
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