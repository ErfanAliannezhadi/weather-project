class Weather {
  constructor(city, state) {
    this.city = city;
    this.state = state;
    this.apikey = "86b0bd9b76517148d71f0967cc7de574";
  }
  async get_weather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apikey}`
    );
    if (response.ok) {
      const response_data = await response.json();
      return response_data;
    } else {
      throw Error(response.status);
    }
  }
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }

  get location() {
    return this.state + " , " + this.city;
  }
}

class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.main = document.getElementById("w-main");
    this.icon = document.getElementById("w-icon");
    this.temp = document.getElementById("w-temp");
    this.temp_min = document.getElementById("w-temp-min");
    this.temp_max = document.getElementById("w-temp-max");
    this.pressure = document.getElementById("w-pressure");
    this.humidity = document.getElementById("w-humidity");
    this.wind_speed = document.getElementById("w-wind-speed");
    this.lon = document.getElementById("w-lon");
    this.lat = document.getElementById("w-lat");
  }
  paint(weather, location) {
    this.location.textContent = location;
    this.main.textContent = this.mainWeather(weather.weather[0].main);
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
    this.temp.textContent = Math.round(weather.main.temp - 273.15);
    this.temp_min.textContent = Math.round(weather.main.temp_min - 273.15);
    this.temp_max.textContent = Math.round(weather.main.temp_max - 273.15);
    this.pressure.textContent = weather.main.pressure;
    this.humidity.textContent = weather.main.humidity;
    this.wind_speed.textContent = weather.wind.speed;
    this.lon.textContent = weather.coord.lon;
    this.lat.textContent = weather.coord.lat;
  }

  mainWeather(mainWeather) {
    switch (mainWeather) {
      case "Thunderstorm":
        return "?????? ?? ??????";
        break;
      case "Drizzle":
        return "???????? ??????????";
        break;
      case "Rain":
        return "????????????";
        break;
      case "Snow":
        return "????????";
        break;
      case "Mist":
        return "????????";
        break;
      case "Smoke":
        return "??????";
        break;
      case "Haze":
        return "???????? ????";
        break;
      case "Dust":
        return "?????? ?? ??????";
        break;
      case "Fog":
        return "????";
        break;
      case "Sand":
        return "????";
        break;
      case "Ash":
        return "???????????? ????????????????";
        break;
      case "Squall":
        return "??????????";
        break;
      case "Tornado":
        return "??????????";
        break;
      case "Clear":
        return "??????";
        break;
      case "Clouds":
        return "????????";
        break;
      default:
        return mainWeather;
    }
  }
}

class Storage {
  constructor() {
    this.city;
    this.state;
    this.defaultCity = "??????????";
    this.defaultStat = "??????????";
  }
  getLocationData() {
    if (localStorage.getItem("city") === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem("city");
    }

    if (localStorage.getItem("state") === null) {
      this.state = this.defaultStat;
    } else {
      this.state = localStorage.getItem("state");
    }

    return {
      city: this.city,
      state: this.state,
    };
  }

  setLocationData(city, state) {
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
  }
}

const ui = new UI();
const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city, weatherLocation.state);

function getweather() {
  weather.get_weather().then((result) => {
    ui.paint(result, weather.location);
  });
}

function changeLocation() {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  console.log(city, state);

  weather.changeLocation(city, state);

  storage.setLocationData(city, state);

  getweather();
}
document.addEventListener("DOMContentLoaded", getweather);
document
  .getElementById("w-change-btn")
  .addEventListener("click", changeLocation);
