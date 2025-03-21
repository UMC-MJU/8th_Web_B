document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    //trim() => 값을 가져올 때 앞뒤 공백을 지워서 가져옴옴
    if (taskText === "") return;
    //만약 taskText의 값이 비어 있다면 그대로 끝냄냄

    let li = document.createElement("li");
    //li 속성을 추가
    let taskSpan = document.createElement("span");
    //span 속성을 추가가
    taskSpan.textContent = taskText;
    //추가된 span속성에 Input창에 있던 값을 넣어줌줌

    let completeBtn = document.createElement("button");
    // "완료" 버튼을 생성
    completeBtn.textContent = "완료";
    //버튼의 텍스트를 "완료"로 설정
    completeBtn.classList.add("complete-btn");
    //버튼에 "complete-btn" 클래스를 추가 (스타일 적용을 위해)
    completeBtn.addEventListener("click", function() {
        moveToDone(li);
    });
    //버튼 클릭 시 moveToDone() 함수를 실행 (할 일을 "해낸 일"로 이동)

    li.appendChild(taskSpan);
    //li에 자식으로 taskSpan을 넣어줌
    li.appendChild(completeBtn);
    //li에 자식으로 completeBtn을 넣어줌줌
    document.getElementById("todoList").appendChild(li);
    //todoList id에 li를 자식으로 넣어줌줌

    taskInput.value = "";
    //Input창을 비워줌 
}

function moveToDone(taskElement) {
    taskElement.querySelector(".complete-btn").remove(); // 완료 버튼 제거

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        taskElement.remove(); // 삭제 버튼 클릭 시 해당 요소 제거
    });

    taskElement.appendChild(deleteBtn);
    document.getElementById("doneList").appendChild(taskElement);
    //해야 할 일에 있던 li 요소가 해낸 일로 이동.
    //이때 appenChild를 사용하면 원래 있던 부모요소인 todoList에 있던 요소가 사라짐
    //왜냐하면 한 요소는 동시에 두 개 이상의 부모를 가질 수 없기 떄문
}