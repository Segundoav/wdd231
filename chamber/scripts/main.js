// ====== CONSTANTES DE LAS URL ======
const currentURL = 'https://api.openweathermap.org/data/2.5/weather?lat=-12.04&lon=-77.03&units=metric&lang=en&appid=...';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=-12.04&lon=-77.03&units=metric&lang=en&appid=...';


// Ajuste de ruta: desde la perspectiva de index.html, la carpeta es "data/members.json"
const membersURL = "data/members.json"; 

// ====== 1. MENÚ HAMBURGUESA RESPONSIVE ======
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuButton.innerHTML = navMenu.classList.contains('open') ? '❌' : '☰';
    });
}

// ====== 2. DATOS DEL TIEMPO (WEATHER API) ======
async function fetchWeather() {
  try {
    const responseCurrent = await fetch(currentURL);
    if (responseCurrent.ok) {
      const data = await responseCurrent.json();
      displayCurrentWeather(data);
    }

    const responseForecast = await fetch(forecastURL);
    if (responseForecast.ok) {
      const dataForecast = await responseForecast.json(); // <-- Corregido aquí
      displayForecast(dataForecast);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayCurrentWeather(data) {
  const container = document.getElementById('weather-current');
  if (!container) return;
  container.innerHTML = `
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
  `;
}

function displayForecast(data) {
  const container = document.getElementById('weather-forecast');
  if (!container) return;
  container.innerHTML = ""; 
  
  // Filtrar lecturas de OpenWeather para obtener una muestra diaria (cada 8 registros)
  const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);
  
  dailyData.forEach(day => {
    const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
    container.innerHTML += `
      <p><strong>${date}:</strong> ${Math.round(day.main.temp)}°C - ${day.weather[0].description}</p>
    `;
  });
}

// ====== 3. MIEMBROS ALEATORIOS (SPOTLIGHTS ORO/PLATA) ======
async function loadSpotlights() {
  try {
    const response = await fetch(membersURL);
    if (!response.ok) throw new Error("Could not load JSON data");
    const data = await response.json();
    const members = data.members;

    // Filtrar solo miembros Gold o Silver
    const premiumMembers = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver");

    // Mezclar el array de forma aleatoria
    const shuffled = premiumMembers.sort(() => 0.5 - Math.random());

    // Seleccionar un máximo de 3 miembros para mostrar
    const selectedMembers = shuffled.slice(0, 3);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error("Error loading spotlight members:", error);
  }
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlights-container");
  if (!container) return;
  container.innerHTML = ""; 

  members.forEach(member => {
    const card = document.createElement("div");
    card.className = `spotlight-card ${member.membershipLevel.toLowerCase()}`;
    card.innerHTML = `
      <h4>${member.name}</h4>
      <p><strong>Level:</strong> ${member.membershipLevel}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

// ====== 4. PIE DE PÁGINA (FECHAS AUTOMÁTICAS) ======
const yearSpan = document.getElementById("currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastModP = document.getElementById("lastModified");
if (lastModP) lastModP.textContent = `Last Modified: ${document.lastModified}`;

// Ejecutar los procesos al cargar el sitio
fetchWeather();
loadSpotlights();