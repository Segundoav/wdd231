// 1. Seleccionar los elementos del HTML
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// 2. Configurar las coordenadas de Trier, Alemania y tu llave
const lat = "49.75";
const lon = "6.64";
const apiKey = "72a449e0b9c4c9d9cb35829d6a579db6"; // <-- REEMPLAZA ESTO CON LA CLAVE QUE COPIASTE

// Construimos la URL usando unidades métricas para tener grados Celsius (°C)
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// 3. Función asíncrona para consumir la API de OpenWeather
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Esto imprimirá el objeto en la consola para revisarlo
            displayResults(data); 
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// 4. Función para renderizar los resultados en la página
function displayResults(data) {
    // Mostramos la temperatura redondeada sin decimales
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    
    // Extraemos el código del icono y la descripción
    const iconCode = data.weather[0].icon;
    const desc = data.weather[0].description;
    
    // Construimos la URL de la imagen (usamos @2x para que tenga mejor resolución)
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Colocamos los atributos en la etiqueta img
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    
    // Ponemos la descripción con la primera letra en mayúscula
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

// 5. Llamamos a la función para que se ejecute al cargar el archivo
apiFetch();