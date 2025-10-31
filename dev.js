document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});
function formatTime(time) {
    const [hour, minute] = time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
}

function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const taskTime = document.getElementById("taskTime").value;

    if (taskInput === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskInput,
        time: taskTime
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    document.getElementById("taskInput").value = "";
    document.getElementById("taskTime").value = "";
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
tasks.sort((a, b) => a.time.localeCompare(b.time));

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const timeText = task.time ? ` <em>(at ${formatTime(task.time)})</em>` : "";
        li.innerHTML = `<strong>${task.text}</strong>${timeText} 
            <button onclick="deleteTask(${index})" style="margin-left:10px;">❌</button>`;
             li.addEventListener("click", function (e) {
      // Avoid toggling if delete button was clicked
      if (e.target.tagName !== "BUTTON") {
        li.classList.toggle("completed");
      }
    });

        taskList.appendChild(li);
    });
}
function clearTasks() {
  localStorage.removeItem("tasks");
  renderTasks();
}

window.onload = renderTasks;
