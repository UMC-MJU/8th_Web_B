import Todo from '../components/Todo';
import { TodoProvider } from '../context/TodoContext';
// import TodoBefore from '../components/TodoBefore';
import './Misson1.css';


function Mission1() {
    return( 

        <TodoProvider>
            <Todo/>
            {/* <TodoBefore /> */}
            {/* 컴포넌트 분리 전의 tsx파일 */}
        </TodoProvider>
    );
}

export default Mission1; 