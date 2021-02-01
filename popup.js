const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

document.addEventListener("DOMContentLoaded", getTodos);

const generateTemplate = (todo) => {

    const html =  `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <strong class="delete">X</strong>
        </li>
    `;

    list.innerHTML += html;
};

addForm.addEventListener("submit", e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if(todo.length) {
        saveLocalTodos(todo);
        generateTemplate(todo);
        addForm.reset();
    } 
    
});

list.addEventListener("click", e => {

    const todo = e.target.parentElement.textContent.trim();
    if(e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        removeLocalTodos(todo);
    }
});


function saveLocalTodos(todo) {

    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {

    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {

    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach( (todo) => {
        generateTemplate(todo);
    })
}