//Enter키를 입력하면 할 일 등록
document.getElementById("todo").addEventListener("keypress", (event) => {
    if(event.key == "Enter"){
        addTodo();
    }
});
// 등록 버튼을 누르면 할 일 등록
document.getElementById("todo-enroll").addEventListener("click",() => {
    addTodo();
});


function addTodo() {
    const todoInput = document.getElementById("todo");
    const todoText = todoInput.value.trim();
    //trim을 붙히면서 todo-enroll에 있는 값을 가져올 때 공백을 지워서 가져옴
    if(todoText === "") return;
    //만약 todoText의 값이 비어있으면 그대로 끝냄.
    const li = document.createElement("li");
    //li 속성을 추가.
    const todoSpan = document.createElement("span");
    //span 속성을 추가
    todoSpan.textContent = todoText;
    //추가된 span속성에 Input으로 입력된 값을 넣어줌

    const completeBtn = document.createElement("button");
    //완료 버튼 생성
    completeBtn.textContent = "완료"
    completeBtn.classList.add("complete-btn");
    //버튼에 complete-btn 클래스를 추가
    completeBtn.addEventListener("click", () => {
        moveToDone(li);
    });
    //버튼 클릭 시 moveToDone() 함수를 실행 => 할 일에서 해낸 일로 이동

    li.appendChild(todoSpan);
    //li에 자식으로 todoSpan을 넣어줌
    li.appendChild(completeBtn);
    //li에 자식으로 completeBtn을 넣어줌
    document.getElementById("TodoList").appendChild(li);
    //TodoList에 li를 자식으로 넣어줌

    todoInput.value ="";
    //input창을 비워줌
}

function moveToDone(todoElement){
    todoElement.querySelector(".complete-btn").remove();
    //완료 버튼 제거
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent ="삭제";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        todoElement.remove();
    })

    todoElement.appendChild(deleteBtn);
    document.getElementById("DoneList").appendChild(todoElement);
}