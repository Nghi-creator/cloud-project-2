const API_BASE_URL =
  "https://heloh3vtld.execute-api.ap-southeast-1.amazonaws.com/prod/tasks";
let tasks = [];

// DOM Elements
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterPriority = document.getElementById("filter-priority");
const filterDate = document.getElementById("filter-date");
const clearFiltersBtn = document.getElementById("clear-filters");

// --- 1. READ ---
async function fetchTasks() {
  try {
    const response = await fetch(API_BASE_URL);
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    if (taskList)
      taskList.innerHTML = `<p class="text-red-500 text-center">Failed to load tasks. Is the server running?</p>`;
  }
}

// --- 2. CREATE ---
if (taskForm) {
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTask = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      priority: document.getElementById("priority").value,
      dueDate: document.getElementById("dueDate").value,
      status: "pending",
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        window.location.href = "list.html";
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });
}

// --- 3. DELETE ---
async function deleteTask(taskId) {
  const isConfirmed = confirm("Are you sure you want to delete this task?");

  if (!isConfirmed) {
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/${taskId}`, { method: "DELETE" });
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// --- 4. UPDATE ---
async function toggleStatus(taskId, currentStatus) {
  const newStatus = currentStatus === "pending" ? "done" : "pending";
  try {
    await fetch(`${API_BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// --- UI & Filtering Logic ---
function renderTasks() {
  if (!taskList) return;

  const priorityFilter = filterPriority.value;
  const dateFilter = filterDate.value;

  let filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesDate = !dateFilter || task.dueDate === dateFilter;
    return matchesPriority && matchesDate;
  });

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML =
      '<p class="text-gray-500 text-center py-8">No tasks found.</p>';
    return;
  }

  const template = document.getElementById("task-card-template");

  filteredTasks.forEach((task) => {
    const isDone = task.status === "done";

    const clone = template.content.cloneNode(true);

    const cardContainer = clone.getElementById("card-container");
    const titleEl = clone.querySelector(".task-title");
    const descEl = clone.querySelector(".task-desc");
    const dueEl = clone.querySelector(".task-due");
    const priorityEl = clone.querySelector(".task-priority");
    const toggleBtn = clone.querySelector(".toggle-btn");
    const deleteBtn = clone.querySelector(".delete-btn");

    titleEl.textContent = task.title;
    descEl.textContent = task.description;
    dueEl.textContent = ` Due: ${task.dueDate}`;
    priorityEl.textContent = ` Priority: ${task.priority}`;
    toggleBtn.textContent = isDone ? "Undo" : "Complete";

    if (isDone) {
      cardContainer.classList.add("border-emerald-400", "opacity-60");
      titleEl.classList.add("line-through", "text-gray-400");
    } else {
      cardContainer.classList.add("border-emerald-600", "hover:shadow-md");
    }

    toggleBtn.addEventListener("click", () =>
      toggleStatus(task.taskId, task.status),
    );
    deleteBtn.addEventListener("click", () => deleteTask(task.taskId));

    taskList.appendChild(clone);
  });
}

// Event Listeners for Filters
if (filterPriority && filterDate && clearFiltersBtn) {
  filterPriority.addEventListener("change", renderTasks);
  filterDate.addEventListener("change", renderTasks);
  clearFiltersBtn.addEventListener("click", () => {
    filterPriority.value = "all";
    filterDate.value = "";
    renderTasks();
  });
}

if (taskList) {
  fetchTasks();
}
