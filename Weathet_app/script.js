const apiKey = "5827dddf24e4380298fd604147b1857a";

const weatherDataElement = document.querySelector(".weather-data");
const cityNameElement = document.querySelector("#city-name");
const formElement = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameElement.value;

    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].main;
        const icon = data.weather[0].icon;

        const details = [
            `${data.name}`,
        ];

        const details1 = [
            `Feels Like ${Math.floor(data.main.feels_like)}ºC `,
            `Humidity : ${data.main.humidity} %`,
            `Wind Speed ${data.wind.speed}m / s`,
        ];

        const details2 = [
            `Min Temp ${Math.floor(data.main.temp_min)}ºC`,
            `Max Temp ${Math.floor(data.main.temp_max)}ºC`,
            `Air Pressure ${data.main.pressure}hpa`,
        ];

        weatherDataElement.querySelector(".temp").textContent = `${temperature} ºC`;
        weatherDataElement.querySelector(".desc").textContent = description;

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png">`;

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail) => {
            return `<div>${detail}</div>`;
        }).join("");

        weatherDataElement.querySelector(".details1").innerHTML = details1.map((detail) => {
            return `<div>${detail}</div>`;
        }).join("");

        weatherDataElement.querySelector(".details2").innerHTML = details2.map((detail) => {
            return `<div>${detail}</div>`;
        }).join("");
    } catch (err) {
        weatherDataElement.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
        weatherDataElement.querySelector(".desc").textContent = "An Error Occur!";
    }
}