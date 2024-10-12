var taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");

let editId,
    isEditedTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// Function to display to-do items
function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h">---</i>
                        <ul class="task-menu">
                            <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Trash</li>
                        </ul>
                    </div>
                </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<span> You don't have any tasks here </span>`;
}

showTodo("all");

// Add event listeners to filter buttons
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// Function to show the task menu
function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

// Function to edit a task
function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

// Function to delete a task
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

// Function to update the status of a task
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Function to clear all tasks
clearAll.addEventListener("click", () => {
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

// Add task to the list
document.getElementById("add-btn").addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    if (userTask) {
        if (!isEditedTask) {
            todos.push({ name: userTask, status: "pending" });
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});
