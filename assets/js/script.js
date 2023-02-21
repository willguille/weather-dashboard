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
    // Style the today div on click
    todayDiv.attr("style", "border: solid 1px black;");
    

    // Get the city name from the search input and change the first character to upper case
    var city = $("#search-input").val().charAt(0).toUpperCase() + $("#search-input").val().slice(1);
    $.ajax({
        url: todayWeatherURL + city + APIKey,
        success: function (data) {
            console.log(data);

            todayDiv.empty();

            var todayTitle = $("<h2>").text(data.name + " (" + now + ") ");
            todayDiv.append(todayTitle);

            var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            todayTitle.append(icon);

            var temp = $("<p>").text("Temp: " + data.main.temp + "°C");
            todayDiv.append(temp);

            var wind = $("<p>").text("Wind: " + data.wind.speed + " KPH");
            todayDiv.append(wind);

            var humidity = $("<p>").text("Wind: " + data.main.humidity + "%");
            todayDiv.append(humidity);

            // Update the history with the new city name
            updateHistory(city);
            renderSearchHistory();

            // Clear the form input
            $("#search-input").val("");


            $.ajax({
                url: forecastWeatherURL + city + APIKey,
                success: function (data) {
                    console.log(data);
        
                    // Update the forecast HTML element with the data
                    forecastDiv.empty();
                    var forecastTitle = $("<h2>").text("5-Day Forecast:");
                    forecastDiv.append(forecastTitle);

                    var weatherCardsDiv = $("<div>").attr("class", "weather-cards-div d-flex");
                    forecastDiv.append(weatherCardsDiv);
        
                    for (let i = 6; i < data.list.length; i += 8) {
                        const forecast = data.list[i];
        
                        weatherCardsDiv.append(`
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <h3>${new Date(forecast.dt * 1000).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"})}</h3>
                                    <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="weather-icon">
                                    <p>Temperature: ${forecast.main.temp} °C</p>
                                    <p>Wind: ${forecast.wind.speed} KPH</p>
                                    <p>Humidity: ${forecast.main.humidity} %</p>
                                </div>
                            </div>
                        </div>`
                      );
                    }  
        
                }
            })
        }
    })
    

    
}
)

// Set up the event listener for the search history items
historyDiv.on("click", "li", (event) => {
    const cityName = $(event.target).text();
  
    // Trigger the form submission with the city name
    $("#search-input").val(cityName);
    $("#search-button").trigger("click");
});

// Get the search history from local storage, or create an empty array if it doesn't exist
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function updateHistory(cityName) {
    // Check if the city is already in the history
    if (searchHistory.includes(cityName)) {
      return;
    }
  
    // Add the city to the history array and the history div
    searchHistory.push(cityName);
     // Save the search history to local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    const newHistoryItem = $("<li>").addClass("list-group-item").text(cityName);
    historyDiv.prepend(newHistoryItem);
}
 
// Function to render the search history
function renderSearchHistory() {
    // Clear the history list
    historyDiv.empty();
  
    // Loop through the search history and add each city to the history list
    for (let i = 0; i < searchHistory.length; i++) {
      // Get the city name and capitalize the first letter
      const cityName = searchHistory[i].charAt(0).toUpperCase() + searchHistory[i].slice(1);
      const historyItem = $("<li>").addClass("list-group-item").text(cityName);
      historyDiv.prepend(historyItem);
    }
}
renderSearchHistory();