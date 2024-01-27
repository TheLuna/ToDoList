const clock = document.querySelector("#clock");
const date = document.querySelector("#date");
const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const worldTimeContainer = document.getElementById("worldTime");
const worldTime1 = document.createElement("span");
const worldTime2 = document.createElement("span");
const worldTime3 = document.createElement("span");
const worldTime4 = document.createElement("span");
const worldTime5 = document.createElement("span");

worldTimeContainer.append(worldTime1);
worldTimeContainer.append(worldTime2);
worldTimeContainer.append(worldTime3);
worldTimeContainer.append(worldTime4);
worldTimeContainer.append(worldTime5);

getDate();
setInterval(getTime, 1000);

function getTime() {
  getClock();
  getWorldTime();
}

function getClock() {
  const currentDate = new Date();
  clock.innerText = currentDate.toLocaleTimeString("en-US");
}

function getWorldTime() {
  worldTime1.innerText = `Hawaii 
        ${getFormatTime("Pacific/Honolulu")}`;

  worldTime2.innerText = `Los Angeles 
        ${getFormatTime("America/Los_Angeles")}`;

  worldTime3.innerText = `New York 
        ${getFormatTime("America/New_York")}`;

  worldTime4.innerText = `London 
          ${getFormatTime("Europe/London")}`;

  worldTime5.innerText = `Seoul
          ${getFormatTime("Asia/Seoul")}`;
}

function getFormatTime(city) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: city,
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());
}

function getDate() {
  const fullDate = new Date();
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const dateToday = fullDate.getDate();
  const dayIndex = fullDate.getDay();
  date.innerText = `${month}/${dateToday}/${year} ${dayOfTheWeek[dayIndex]}`;
}
