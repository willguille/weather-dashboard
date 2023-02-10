// Create variables to save divs
var historyDiv = $("#history");
var todayDiv = $("#today");
var forecastDiv = $("#forecast");
var now = moment().format("DD/MM/YYYY");

var APIUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
var APIKey = "&appid=32306d8e68f68c9295a794f157aaab66";

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    $.ajax({
        url: APIUrl + city + APIKey,
        success: function (data) {
            console.log(data);

            var todayTitle = $("<h2>").text(data.city.name + " (" + now + ") ");
            todayDiv.append(todayTitle);
        }
    })

}
)