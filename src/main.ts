const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

type task = {
  title: string;
  completed: boolean;
  createdAt: Date;
};

const tasks: task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newtask: task = {
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newtask);
  saveTasks();

  addListItem(newtask);
  input.value = "";
});

function addListItem(task: task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): task[] {
  const TASKJSON = localStorage.getItem("TASKS");

  if (TASKJSON == null) return [];

  return JSON.parse(TASKJSON);
}
