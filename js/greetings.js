const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const btnLogout = document.querySelector("#btnLogout");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem("username", username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `Hello, ${username}!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  btnLogout.classList.remove(HIDDEN_CLASSNAME);
  btnLogout.addEventListener("click", onLogOut);
}

function paintForm() {
  loginInput.value = "";
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
}

function onLogOut() {
  greeting.classList.add(HIDDEN_CLASSNAME);
  btnLogout.classList.add(HIDDEN_CLASSNAME);
  paintForm();
  localStorage.removeItem(USERNAME_KEY);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  paintForm();
} else {
  paintGreetings(savedUserName);
}
