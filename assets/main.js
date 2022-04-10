var searchEl = $('#searchBtn');
var symbolInputEl = $('#symbolInput');
var symbolEl = $('#symbol');
var openEl = $('#open');
var highEl = $('#high');
var lowEl = $('#low');
var closeEl = $('#close');
var volumeEl = $('#volume');
var lastTradingDayEl = $('#lastTradingDay');
var previousCloseEl = $('#previousClose');
var changeEl = $('#change');
var percentChangeEl = $('#percentChange');
var searchStocks = [];
var seacrhCrypto = [];
var searchHistory = $('#searchHistory');
var TempEl = $('#temp')
var weatherIcon = $('CurrentIcon')

var getPrice = function (stockSymbol) {

    // This is our API Key
    var APIKey = "ZPJN82R5I3MVTIE9";
    userInput = '';

    $.ajax({
        url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockSymbol + "&apikey=" + APIKey,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var testStocks = response['Global Quote']['01. symbol']

            symbolEl.text(response['Global Quote']['01. symbol']);
            openEl.text("Open: $" + response['Global Quote']['02. open']);
            highEl.text("High: $" + response['Global Quote']['03. high']);
            lowEl.text("Low: $" + response['Global Quote']['04. low']);
            closeEl.text("Close: $" + response['Global Quote']['05. price']);
            volumeEl.text("Volume " + response['Global Quote']['rading day']);
            previousCloseEl.text("Previous close: " + response['Global Quote06. volume']);
            lastTradingDayEl.text(response['Global Quote']['07. latest t']['08. previous close']);
            changeEl.text("Change: $" + response['Global Quote']['09. change']);
            percentChangeEl.text("Percent Change: " + response['Global Quote']['10. change percent']);



        })
}

var validStockSymbol = function () {

}

function getWeather(latitude, longitude) {

    // This is our API Key
    var APIKey = "a06d944ede27cc09def4a9395b9e5551";
    userInput = '';

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +"&appid=" + APIKey,
        method: "GET"
    })
    .then(function (response) {
        console.log(response);
        // cityNameEl.text(response.name);
        TempEl.text(((response.current.temp)));

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey,
            method: "GET" 
        })
        .then(function(forecastResponse) {
            console.log(forecastResponse)
            for(i = 0; i < forecastResponse.list.length ; i += 8) {
                weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[i].weather[i].icon + "@4x.png")
            }
        })
    })
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}


function showPosition(position) {
    getWeather(position.coords.latitude, position.coords.longitude); 
}



function listArray() {
    searchStocks.push(symbolInputEl.val());
    localStorage.setItem("Symbol", (JSON.stringify(searchStocks)));
}


stocks = JSON.parse(localStorage.getItem("Symbol"))
stocks.forEach(function(random) {
    // add the stock to the webpage
    console.log(random);
});



symbolInputEl.on("keypress", function (e) {
    if (e.key === 'Enter') {
        getPrice(symbolInputEl.val());
    }
})

searchEl.on("click", function () {
    getPrice(symbolInputEl.val());
})


