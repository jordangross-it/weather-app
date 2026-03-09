// grab elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResults = document.getElementById("weatherResults");

// click event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherResults.innerHTML = "<p>Please enter a city.</p>";
  }
});

async function getWeather(city) {
  const apiKey = "89c85082cc52d65cf6c745f641d20a01";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResults.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description, icon } = data.weather[0];

  weatherResults.style.display = "block";

  weatherResults.innerHTML = `
    <h2>${name}</h2>
    <p>${Math.round(temp)}°F</p>
    <p>${description}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
  `;
}


// Grab the reset button
const resetBtn = document.getElementById("resetButton");

resetBtn.addEventListener("click", () => {
  cityInput.value = "";
  weatherResults.innerHTML = "";
  weatherResults.style.display = "none";
  cityInput.focus();
});