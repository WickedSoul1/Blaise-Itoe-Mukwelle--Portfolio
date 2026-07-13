let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task");
const courseInput = document.getElementById("course");
const dateInput = document.getElementById("date");
const priorityInput = document.getElementById("priority");
const taskContainer = document.getElementById("tasks");
const search = document.getElementById("search");

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;

    const progress = total ? (completed / total) * 100 : 0;
    document.getElementById("progress").style.width = progress + "%";
}

function renderTasks() {

    taskContainer.innerHTML = "";

    const keyword = search.value.toLowerCase();

    tasks
        .filter(task => {
            const matchesFilter =
                currentFilter === "all" ||
                (currentFilter === "completed" && task.completed) ||
                (currentFilter === "pending" && !task.completed);

            const matchesSearch =
                task.name.toLowerCase().includes(keyword) ||
                task.course.toLowerCase().includes(keyword);

            return matchesFilter && matchesSearch;
        })
        .forEach((task, index) => {

            const div = document.createElement("div");

            div.className = `task ${task.completed ? "completed" : ""}`;

            div.innerHTML = `
                <div class="task-info">
                    <h3>${task.name}</h3>
                    <p>${task.course}</p>
                    <small>${task.date}</small><br>
                    <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
                </div>

                <div class="actions">
                    <button class="complete">${task.completed ? "Undo" : "Done"}</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            div.querySelector(".complete").onclick = () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            };

            div.querySelector(".delete").onclick = () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            };

            taskContainer.appendChild(div);

        });

    updateStats();
}

document.getElementById("addTask").onclick = () => {

    if (
        taskInput.value === "" ||
        courseInput.value === "" ||
        dateInput.value === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    tasks.push({

        name: taskInput.value,

        course: courseInput.value,

        date: dateInput.value,

        priority: priorityInput.value,

        completed: false

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";
    courseInput.value = "";
    dateInput.value = "";
};

search.addEventListener("input", renderTasks);

document.querySelectorAll(".filters button").forEach(button => {

    button.onclick = () => {

        document.querySelectorAll(".filters button")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    };

});

renderTasks();