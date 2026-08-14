const weatherLocation = document.getElementById("weather-location");
const weatherTemp = document.getElementById("weather-temp");
const weatherCondition = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

navigator.geolocation.getCurrentPosition(
    function (position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const locationUrl =
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;

        fetch(locationUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (locationData) {
                console.log(locationData);

                weatherLocation.textContent = locationData.city;
            })

        fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const temperature = data.current.temperature_2m;
                const weatherCode = data.current.weather_code;

                let condition;
                let icon;

                weatherTemp.textContent = temperature + "°C";

                switch (weatherCode) {
                    case 0:
                        condition = "Clear";
                        icon = "assets/images/sun.png";
                        break;

                    case 1:
                        condition = "Mainly clear";
                        icon = "assets/images/sun.png";
                        break;

                    case 2:
                        condition = "Partly cloudy";
                        icon = "assets/images/cloudy.png";
                        break;

                    case 3:
                        condition = "Overcast";
                        icon = "assets/images/cloudy.png";
                        break;

                    case 45:
                    case 48:
                        condition = "Foggy";
                        icon = "assets/images/cloudy.png";
                        break;

                    case 51:
                    case 53:
                    case 55:
                        condition = "Drizzle";
                        icon = "assets/images/rain.png";
                        break;

                    case 61:
                    case 63:
                    case 65:
                        condition = "Rain";
                        icon = "assets/images/rain.png";
                        break;

                    case 71:
                    case 73:
                    case 75:
                        condition = "Snow";
                        icon = "assets/images/sleet.png";
                        break;

                    case 80:
                    case 81:
                    case 82:
                        condition = "Rain showers";
                        icon = "assets/images/rain.png";
                        break;

                    case 95:
                    case 96:
                    case 99:
                        condition = "Thunderstorm";
                        icon = "assets/images/lightning-bolt.png";
                        break;

                    default:
                        condition = "Unknown";
                }

                weatherCondition.textContent = condition;
                weatherIcon.src = icon;
            })

            // Weather API error handling
            .catch(function (error) {
                console.error("Weather error:", error);
                weatherCondition.textContent = "Weather unavailable";
            });
    },

    // Location error handling
    function (error) {
        console.error("Location error:", error);

        weatherLocation.textContent = "Location unavailable";
        weatherTemp.textContent = "--°C";
        weatherCondition.textContent = "Weather unavailable";
        weatherIcon.src = "";
    }
);