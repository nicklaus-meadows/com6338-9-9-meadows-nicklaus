// Your code here

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "21766497e81d7f5ea95bd756486c8107";
const form = document.querySelector("form");
let weatherEl = document.querySelector("#weather");
let input = document.querySelector("#weather-search");

form.onsubmit = function (e) {
    e.preventDefault();

    let locale = input.value.trim();// trim spaces
    let queryString = "?q=" + locale + "&units=imperial&appid=" + API_KEY; //knee jerk reaction makes me want to add my key here, but crashes out when I do. 
    let fetchURL = URL + queryString;

    fetch(fetchURL)
        .then(function (res) {
            if (res.status !== 200) {
                input.value = "";
                throw new Error("Location not found");
            }

            // Clear old content
            input.value = "";
            weatherEl.innerHTML = "";
            return res.json();
        })

        // Date time handling
        .then(function (data) {
            let dateTime = data.dt * 1000;
            let date = new Date(dateTime); // sort specific times
            let timeString = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit"
            });

            // Append all the things
            weatherEl.innerHTML =
                "<h2>City: " + data.name + ", " + data.sys.country + "</h2>" +
                "<a href='https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon + "' target='_blank'>Click to view map</a>" +
                "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>" +
                "<p style='text-transform: capitalize;'>Description: " + data.weather[0].description + "</p><br>" +
                "<p>Actual Temp: " + data.main.temp + "</p>" +
                "<p>Perceived: " + data.main.feels_like + "</p>" +
                "<p>Last Updated: " + timeString + "</p>";
        })

        // for the error catches
        .catch(function (err) {
            weatherEl.textContent = err.message;
        });
};