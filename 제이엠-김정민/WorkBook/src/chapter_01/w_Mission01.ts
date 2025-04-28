// HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm= document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 할 일이 어떻게 생긴애인지 type을 정의
type Todo = {
    id: number;
    text: string;
};

//할 일& 해낸 일을 Todo의 배열형태로 저장장
let todos : Todo[] = [];
let doneTasks: Todo[] = [];

// 할 일 텍스트 입력 처리 함수 (공백 잘라줌)
const getTodoText = () :string => {
    return todoInput.value.trim();
    //todo-input에 있는 값을 받아오면서 trim()으로 공백을 제거해서 가져옴
};

// 전체 목록 렌더링
const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    //기존의 todoList와 doneList를 초기화

    todos.forEach((todo) : void => {
        const li = createTodoElement(todo, false);
        //해야 할 일은 false로 나타냄
        todoList.appendChild(li);
        //todoList에 createTodoElement로 생성한 <li>태그를 자식으로 넣는다.
    });

    doneTasks.forEach((todo) : void => {
        const li = createTodoElement(todo, true);
        //완료한 일은 true로 나타냄
        doneList.appendChild(li);
        //doneList에 createTodoElement로 생성한 <li>태그를 자식으로 넣는다.
    })
};

// 할 일 추가 처리 함수
const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text});
    //새로운 할 일을 todos배열에 추가 => push를 사용해서 
    todoInput.value= '';
    //입력창 초기화 후, renderTasks() 로 화면 렌더링
    renderTasks();
};

//할 일 완료
const completeTodo = (todo:Todo): void => {
    todos = todos.filter((t):boolean => t.id !== todo.id); 
    //todos 배열에서 완료한 아이템 제거 => filter를 이용
    doneTasks.push(todo);
    //완료된 아이템을 doneTasks 배열에 추가 => push를 이용해서
    renderTasks();
    //doneTasks에 추가한 것을 보여주기 위해 다시 렌더링
};

// 완료된 일 삭제
const deleteTodo = (todo:Todo): void =>{
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    //doneTasks 배열에서 완료된 아이템만 제거
    renderTasks();
    // 제거된 것을 보여주기 위해 다시 렌더링
};

// 할 일 요소 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
    
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;
    //<li> 태그 생성 => 클래스 이름을 render-container_item으로 설정
    //li의 textContent를 todo의 text이름으로 설정

    const button = document.createElement('button');
    button.classList.add('render-container_item-button');
    //<button> 태그 생성 => 클래스 이름을 render-container_item-button으로 설정

    if(isDone){
        //isDone 값이 true면 삭제 버튼 생성
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
    } else{
        //isDone 값이 false면 완료 버튼 생성
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
    }

    button.addEventListener('click', () => {
        if(isDone){
            //isDone 값이 true면 deleteTodo() 함수 실행
            deleteTodo(todo);
        } else{
            //isDone 값이 false면 completed() 함수 실행
            completeTodo(todo);
        }
    }); 

    li.appendChild(button);
    //버튼을 <li>태그의 자식태그로 집어 넣는다.
    return li;
};

//폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void =>{
    event.preventDefault();
    //폼 제출 시 새로고침을 막는다.
    //preventDefault()가 없으면 폼 제출하면 페이지가 새로고침됨!
    const text = getTodoText();
    if(text) {
        addTodo(text);
    }
});

//초기 렌더링
renderTasks();