import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined> (undefined);

//  Provider을 만드는 1번 방법
// export const TodoProvider = ({children}: {children: 
//     ReactNode}) => {
// Provider을 만드는 2번 방법법
export const TodoProvider = ({ children }: PropsWithChildren) => {

    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo = (text: string): void => {
        const newTodo: TTodo = { id: Date.now(), text };
        // //전개 연산자를 통해서 이전 값 모두 저장후 새로운 값을 추가
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
    };

    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos): TTodo[] =>
            //filter은 true면 포함, false면 제외외
            //처리하려는 todo와 id가 다른 것만 남김김
            prevTodos.filter((t): boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodos): TTodo[] =>
            prevDoneTodos.filter((t): boolean => t.id !== todo.id));
    };

    return (
        <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
};

export const useTodo = () :ITodoContext=> {
    const context = useContext(TodoContext);
    //context가 없는 경우
    if(!context){
        throw new Error('useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.');
    }
    //context가 있는 경우
    return context;
};
