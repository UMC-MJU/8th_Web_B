interface TodoFormProps{
    input: string;
    setInput: (input:string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) =>
        void;
}



const TodoForm = ({input, setInput,handleSubmit }:TodoFormProps) => {
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