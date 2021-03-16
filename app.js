const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('#todo-list');

// === FORM SUBMISSION ===
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Create New Task Element
  console.log(taskInput.value);
  const taskLi = createTaskElement(taskInput.value);
  addTask(taskLi);
  updateLocalStorage();
  //Reset Form
  taskInput.value = "";
});

// === Task List Elements === 
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'remove';
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');

  taskElement.innerText = task + ' ';
  taskElement.classList.add('task');
  taskElement.prepend(checkbox);
  taskElement.append(removeBtn);
  return taskElement;
}

// === Task Controls ===
function addTask(taskElement) {
  taskList.append(taskElement);
}

function removeTask(taskElement) {
  taskElement.remove();
}

function completeTask(taskElement) {
  taskElement.classList.toggle('complete');
}

// === Task Event Delegation ===  
taskList.addEventListener('click', (e) => {
  const {tagName, innerText, parentElement} = e.target;

  console.dir(e.target);
  if (tagName === 'BUTTON' && innerText === 'remove') {
    removeTask(parentElement);
  } else if (tagName === 'INPUT') {
    completeTask(parentElement);
  }
  updateLocalStorage();
});

// === LOCAL STORAGE ===
function updateLocalStorage() {
  localStorage.tasks = JSON.stringify(taskList.innerHTML);
}

function getLocalStorage() {
  return JSON.parse(localStorage.tasks);
}

// -- Load Local if Present --
window.addEventListener('load', () => {
  if (localStorage.tasks) {
    taskList.innerHTML = getLocalStorage();;
  }
})