// DOM 요소 선택
const form = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 할 일 추가 이벤트
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const task = input.value.trim();
  console.log("submit 클릭");

  addTodo(task);
  input.value = "";
});

// 할 일 추가 함수
function addTodo(task: string): void {
  const li = document.createElement("li");
  const p = document.createElement("p");
  li.classList.add("render-container__item");
  p.classList.add("render-container__item-text");

  p.textContent = task;
  console.log(task);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.classList.add("render-container__item-button");
  completeBtn.addEventListener("click", () => {
    console.log("완료 버튼 클릭");
    moveToDone(task, li);
  });

  li.appendChild(p);
  li.appendChild(completeBtn);
  todoList.appendChild(li);
}

// 완료 목록으로 이동
function moveToDone(task: string, item: HTMLLIElement): void {
  item.remove();

  const li = document.createElement("li");
  const p = document.createElement("p");
  li.classList.add("render-container__item");
  p.classList.add("render-container__item-text");

  p.textContent = task;
  console.log(task);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.classList.add("render-container__item-button");
  deleteBtn.style.backgroundColor = "#dc3545";
  deleteBtn.addEventListener("click", () => {
    console.log("삭제 버튼 클릭");
    li.remove();
  });

  li.appendChild(p);
  li.appendChild(deleteBtn);
  doneList.appendChild(li);
}
