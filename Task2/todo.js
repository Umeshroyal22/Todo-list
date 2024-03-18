document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("task-list");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const filterCompletedCheckbox = document.getElementById("filter-completed");

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            updateCompletedTasksVisibility(); // Update visibility after adding task
        } else {
            alert("Please enter a task.");
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        const deleteBtn = taskItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(taskItem);
            updateCompletedTasksVisibility(); // Update visibility after deleting task
        });

        // Allow users to mark tasks as completed
        taskItem.addEventListener("click", function() {
            taskItem.classList.toggle("completed");
            updateCompletedTasksVisibility(); // Update visibility after marking task as completed
        });
    }

    // Function to update visibility of completed tasks based on checkbox state
    function updateCompletedTasksVisibility() {
        const tasks = document.querySelectorAll(".task-item");
        tasks.forEach(function(task) {
            if (filterCompletedCheckbox.checked && task.classList.contains("completed")) {
                task.style.display = "none";
            } else {
                task.style.display = "block";
            }
        });
    }

    // Filter tasks based on completed status
    filterCompletedCheckbox.addEventListener("change", updateCompletedTasksVisibility);

    // Clear all tasks
    const clearTasksBtn = document.getElementById("clear-tasks");
    clearTasksBtn.addEventListener("click", function() {
        taskList.innerHTML = "";
        updateCompletedTasksVisibility(); // Update visibility after clearing all tasks
    });
});
