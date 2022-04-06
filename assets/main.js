$(function(){    
    // create variables and assign them to DOM elements
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


    function getPrice(stockSymbol){

        // This is our API Key
        var APIKey = "ZPJN82R5I3MVTIE9";
        userInput = '';

        $.ajax({
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockSymbol + "&apikey=" + APIKey,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            symbolEl.text(response['Global Quote']['01. symbol']);
            openEl.text(response['Global Quote']['02. open']);
            highEl.text(response['Global Quote']['03. high']);
            lowEl.text(response['Global Quote']['04. low']);
            closeEl.text(response['Global Quote']['05. price']);
            volumeEl.text(response['Global Quote']['06. volume']);
            lastTradingDayEl.text(response['Global Quote']['07. latest trading day']);
            previousCloseEl.text(response['Global Quote']['08. previous close']);
            changeEl.text(response['Global Quote']['09. change']);
            percentChangeEl.text(response['Global Quote']['10. change percent']);


            // $.ajax({
            //     url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey,
            //     method: "GET" 
            // })
            // .then(function(forecastResponse) {
            //     console.log(forecastResponse)
            //     for(i = 0; i < forecastResponse.list.length ; i += 8) {
            //         forecast.append(`<div>${((forecastResponse.list[i].main.temp - 273.15) * 9/5 + 32)}</div>`);
            //         weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[i].weather[i].icon + "@4x.png")
            //     }
            // })
        })
    }

    searchEl.on("click", function() {
        getPrice(symbolInputEl.val());
    })
})