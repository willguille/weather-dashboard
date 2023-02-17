// Create variables to save divs
var historyDiv = $("#history");
var todayDiv = $("#today");
var forecastDiv = $("#forecast");
var now = moment().format("DD/MM/YYYY");

var todayWeatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="
var APIKey = "&appid=32306d8e68f68c9295a794f157aaab66";

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    $.ajax({
        url: todayWeatherURL + city + APIKey,
        success: function (data) {
            console.log(data);

            var todayTitle = $("<h2>").text(data.name + " (" + now + ") ");
            todayDiv.append(todayTitle);

            var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            todayTitle.append(icon);

            var temp = $("<p>").text("Temp: " + data.main.temp);
            todayDiv.append(temp);

            var wind = $("<p>").text("Wind: " + data.wind.speed + " KPH");
            todayDiv.append(wind);

            var humidity = $("<p>").text("Wind: " + data.main.humidity + "%");
            todayDiv.append(humidity);
        }
    })
    // // Add the city name to the search history
    // const searchHistoryItem = $("<li>").text(data.name);
    // historyDiv.append(searchHistoryItem);

    $.ajax({
        url: forecastWeatherURL + city + APIKey,
        success: function (data) {
            console.log(data);

            // Update the forecast HTML element with the data
            forecastDiv.empty();

            for (let i = 0; i < data.list.length; i += 8) {
                const forecast = data.list[i];

                forecastDiv.append(`
                <div class="col-lg-2">
                    <div class="card">
                        <div class="card-body">
                            <h3>${new Date(forecast.dt * 1000).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"})}</h3>
                            <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="weather-icon">
                            <p>Temperature: ${forecast.main.temp} &#8451;</p>
                            <p>Humidity: ${forecast.main.humidity} %</p>
                        </div>
                    </div>
                </div>`
              );
            }  

        }
    })
}
)