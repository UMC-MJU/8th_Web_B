import './App.css'
import Todo from './components/Todo.tsx';
import {TodoProvider} from './context/TodoContext';

function App() {

  return (
    <TodoProvider>
    <Todo />
    </TodoProvider>
  );
}

export default App;
