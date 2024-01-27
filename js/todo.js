const toDoForm = document.getElementById("todo-form");
const toDoEditForm = document.getElementById("todo-edit-form");
const toDoInput = document.getElementById("toDoInput");
const toDoEditInput = document.getElementById("toDoEditInput");
const toDoList = document.getElementById("todo-list");
const btnClearToDo = document.getElementById("btnClearToDo");
const TODOS_KEY = "todos";
let toDos = [];

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();

  clearEditInput();

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function clearEditInput() {
  toDoEditForm.classList.add(HIDDEN_CLASSNAME);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);
}

function EditToDo(event) {
  toDoEditForm.classList.remove(HIDDEN_CLASSNAME);
  toDoForm.classList.add(HIDDEN_CLASSNAME);

  const li = event.target.parentElement;
  toDoEditInput.value = li.firstChild.innerText;

  btnClearToDo.addEventListener("click", clearEditInput);
  toDoEditForm.addEventListener("submit", submitToDoEdit);
  toDoEditForm.targetID = li.id;
}

function submitToDoEdit(event) {
  event.preventDefault();
  const targetID = event.target.targetID;

  toDos = JSON.parse(localStorage.getItem(TODOS_KEY));
  const selectedToDo = toDos.filter((todo) => todo.id == parseInt(targetID));

  const newText = toDoEditInput.value;
  selectedToDo[0].text = newText;

  const targetLi = document.getElementById(targetID);
  targetLi.firstChild.innerText = newText;

  clearEditInput();
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);
  li.children[0].addEventListener("click", EditToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
