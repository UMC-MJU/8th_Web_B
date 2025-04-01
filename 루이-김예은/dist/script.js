"use strict";
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value.trim();
    console.log("submit 클릭");
    addTodo(task);
    input.value = "";
});
function addTodo(task) {
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
function moveToDone(task, item) {
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
