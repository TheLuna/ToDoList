const API_KEY = "3878f48e2f3dd397bfc0ecdcd990dcd4";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const weatherMinMax = document.querySelector("#weather span:last-child");
      const description = data.weather[0].main;
      const temperature = data.main.temp;
      const temperatureMin = data.main.temp_min;
      const temperatureMax = data.main.temp_max;
      const city = data.name;
      weather.innerText = `${Math.round(temperature)}F (${Math.round(
        ((temperature - 32) * 5) / 9
      )}C) ${description} - ${city}`;
      weatherMinMax.innerText = `${Math.round(temperatureMin)}F ~ ${Math.round(
        temperatureMax
      )}F / (${Math.round(((temperatureMin - 32) * 5) / 9)}C ~ ${Math.round(
        ((temperatureMax - 32) * 5) / 9
      )}C)`;
      //   console.log(url);
    });
}

function onGeoError() {
  alert("Can't find you.No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
