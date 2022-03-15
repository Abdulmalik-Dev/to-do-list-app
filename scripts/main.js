// Cash
let inputAddTask = document.querySelector("#inputAddTask"),
  btnAddTask = document.querySelector("#btnAddTask"),
  tasksContainer = document.querySelector("#tasksContainer"),
  tasksCount = document.querySelector("#tasksCount"),
  complated = document.querySelector("#complated");

btnAddTask.addEventListener("click", () => {
  // Check If There Is Thing Wrote In The Input Or Not
  if (inputAddTask.value && tasksContainer.innerHTML == "No Tasks")
    tasksContainer.innerHTML = "";
  createNewTask();
});
// Set Tasks Count Number
const tasksCountFunc = () =>
  (tasksCount.innerHTML = tasksContainer.childElementCount);
// Set Complated Tasks Count Number
const complateTasksFunc = () =>
  (complated.innerHTML = document.querySelectorAll(".complate-task").length);

function createNewTask() {
  // If There Is No Task Wrote In The Input
  if (inputAddTask.value === "" || inputAddTask.value === null) {
    // Create Sweet Alert
    let div = document.createElement("div"),
      sweetAlert = document.createTextNode(
        "No Task Wrote, Plase Write Your Task First, and try again..."
      );
    div.className = "sweet-alert";

    div.appendChild(sweetAlert);
    document.body.appendChild(div);
    // Hide The Sweet Alert After 2 Seconds
    setTimeout(() => {
      div.style.opacity = "0";
    }, 1500);
    // Remove The Sweet From The Dom Tree
    setTimeout(() => div.remove(), 2100);
  } else {
    // Else There Is Task Wrote In The Input
    let div = document.createElement("div"),
      p = document.createElement("p"),
      task = document.createTextNode(inputAddTask.value),
      delteBtn = document.createElement("span"),
      delteBtnText = document.createTextNode("Delete");

    // To Can Make Access On The Tasks
    div.dataset.task = true;
    p.dataset.taskText = true;
    delteBtn.dataset.deleteTask = true;

    // Appeand Task
    delteBtn.appendChild(delteBtnText);
    div.appendChild(p);
    p.appendChild(task);
    div.appendChild(delteBtn);
    tasksContainer.appendChild(div);

    localStorageAction();
    tasksCountFunc();

    inputAddTask.value = "";
  }
}

function deleteTaskFunc(targetTask) {
  targetTask.remove();

  tasksCountFunc();
  complateTasksFunc();
  localStorageAction();
  // Check If This Is The Lastest Task
  if (tasksCount.innerHTML <= 0) {
    tasksContainer.innerHTML = "No Tasks";

    localStorage.removeItem("lTasks");
  }
}

function localStorageAction() {
  // To Add All Tasks To This Array To Save Them To The LocalStorage
  let allTasks = [];

  // Push All Tasks To The AllTasks Array
  for (let i = 0; i < tasksContainer.childElementCount; i++) {
    allTasks.push({
      theTask: tasksContainer.children[i].children[0].innerHTML,
      isComplate: tasksContainer.children[i].classList.contains("complate-task")
        ? true
        : false,
    });
  }
  // Save Them To The LocalStorage
  localStorage.setItem("lTasks", JSON.stringify(allTasks));
}

document.addEventListener("click", (e) => {
  // The Click Element = The Task Container
  if (e.target.dataset.task === "true") {
    // Add Complate Class To The Task Container
    e.target.classList.toggle("complate-task");

    complateTasksFunc();
    localStorageAction();
  }
  // The Click Element = The Task Text
  else if (e.target.dataset.taskText === "true") {
    // Add Complate Class To The Task Container
    e.target.parentElement.classList.toggle("complate-task");

    complateTasksFunc();
    localStorageAction();
  }
  // The Click Element = Delete Button
  else if (e.target.dataset.deleteTask === "true")
    deleteTaskFunc(e.target.parentElement);
});
// To Get All Tasks On Load/Reload The Page
function getLastTasks() {
  tasksContainer.innerHTML = "";
  // Get The Tasks From The LocalStorage
  let myTasks = JSON.parse(localStorage.getItem("lTasks"));
  // Set The Tasks To The Page
  for (let i = 0; i < myTasks.length; i++) {
    tasksContainer.innerHTML += `<div data-task = 'true' ${
      myTasks[i]["isComplate"] === true ? "class='complate-task'" : null
    }>
    <p data-task-text = 'true'>${myTasks[i]["theTask"]}</p>
    <span data-delete-task = 'true'>Delete</span>
    </div>`;
  }

  tasksCountFunc();
  complateTasksFunc();
}

window.onload = () => {
  let lastTasks = localStorage.getItem("lTasks");
  // Check If The LocalStorage Has Tasks
  if (lastTasks) {
    getLastTasks();
    tasksCountFunc();
    complateTasksFunc();
  } else tasksContainer.innerHTML = "No Tasks";
};
