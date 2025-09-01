const API_KEY = "816adeba94dc15d4d781be0eb17a51d9";

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Enter a city name!");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    console.log("Weather Response:", data);

    if (data.cod !== 200) {
      alert(`Error: ${data.message}`);
      hideWeatherUI();
      return;
    }

    displayWeather(data);
    await getForecast(city);

  } catch (err) {
    console.error("Fetch Error:", err);
    alert("Unable to fetch weather data!");
    hideWeatherUI();
  }
}

async function getForecast(city) {
  try {
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();
    console.log("Forecast Response:", forecastData);

    if (forecastData.cod !== "200") {
      alert(`Error: ${forecastData.message}`);
      hideForecastUI();
      return;
    }

    displayForecast(forecastData.list.slice(0, 5));

  } catch (err) {
    console.error("Forecast Fetch Error:", err);
    alert("Unable to fetch forecast!");
    hideForecastUI();
  }
}

function displayWeather(data) {
  const card = document.getElementById("weather-card");
  card.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <h3>${Math.round(data.main.temp)}°C</h3>
  `;
  card.classList.remove("hidden");
}

function displayForecast(list) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";
  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "forecast-item";
    div.innerHTML = `
      <p>${new Date(item.dt_txt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
      <p>${Math.round(item.main.temp)}°C</p>
    `;
    forecastDiv.appendChild(div);
  });
  forecastDiv.classList.remove("hidden");
}

function hideWeatherUI() {
  document.getElementById("weather-card").classList.add("hidden");
}

function hideForecastUI() {
  document.getElementById("forecast").classList.add("hidden");
}
