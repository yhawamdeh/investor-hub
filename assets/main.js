var searchEl = $('#searchBtn');
var symbolInputEl = $('#symbolInput');
var symbolEl = $('#symbol');
var cryptoEl = $('#crypto');
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
var searchHistory = $('.search-history');


// // Our labels along the x-axis
// var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
// // For drawing the lines
// var africa = [86,114,106,106,107,111,133,221,783,2478];
// var asia = [282,350,411,502,635,809,947,1402,3700,5267];
// var europe = [168,170,178,190,203,276,408,547,675,734];
// var latinAmerica = [40,20,10,16,24,38,74,167,508,784];
// var northAmerica = [6,3,2,2,7,26,82,172,312,433];


// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, {
// type: 'line',
// data: {
//     labels: years,
//     datasets: [
//     { 
//         data: africa,
//         label: "Africa",
//         borderColor: "#3e95cd",
//         fill: false
//     },
//     { 
//       data: asia,
//       label: "Asia",
//       borderColor: "#3e95cd",
//       fill: false
//     },
//     { 
//       data: europe,
//       label: "Europe",
//       borderColor: "#3e95cd",
//       fill: false
//     },
//     { 
//       data: latinAmerica,
//       label: "Latin America",
//       borderColor: "#3e95cd",
//       fill: false
//     },
//     { 
//       data: northAmerica,
//       label: "North America",
//       borderColor: "#3e95cd",
//       fill: false
//     }
//     ]
// }
// });

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
        openEl.text("Open: $" + response['Global Quote']['02. open']);
        highEl.text("High: $" + response['Global Quote']['03. high']);
        lowEl.text("Low: $" + response['Global Quote']['04. low']);
        closeEl.text("Close: $" + response['Global Quote']['05. price']);
        volumeEl.text("Volume " + response['Global Quote']['06. volume']);
        lastTradingDayEl.text(response['Global Quote']['07. latest trading day']);
        previousCloseEl.text("Previous close: " + response['Global Quote']['08. previous close']);
        changeEl.text("Change: $" + response['Global Quote']['09. change']);
        percentChangeEl.text("Percent Change: " + response['Global Quote']['10. change percent']);

        
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

function getCrypto(cryptoSrc){
    // This is our API Key
    var APIKey = "89FC72D5-865C-4FA3-9035-6FFB67FEF2AE";
    userInput = '';
    
    $.ajax({
        url: "https://rest.coinapi.io/v1/quotes/BITSTAMP_SPOT_" + cryptoSrc + "_USD/current?apikey=" + APIKey,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        cryptoEl.text(response['ask_price']);
    })
}

function listArray() {

     // empty search history in sidebar                                |
    // searchHistory.empty();                                          |
    // // //each city added to array                                   |
    // searchResults.forEach(function(symbol){                         |
    //     var searchHistoryItem = $('<li class="list-group-item">');  |<------ HELP!!!!!!
    //     searchHistoryItem.attr("data-value", symbol);               |
    //     searchHistoryItem.text(symbol);                             |
    //     cityHistory.prepend(searchHistoryItem);                     |
    // });
    // update city list history in local storage
    localStorage.setItem("Symbol", (symbolInputEl.val()));
}



    
searchEl.on("click", function() {
    if(symbolInputEl.val() === 'AAPL'){
        getPrice(symbolInputEl.val());
        listArray();
        // localStorage.setItem("input", JSON.stringify(searchResults));
    } else if (symbolInputEl.val() === 'BTC') {
        searchHistory.empty();
        getCrypto(symbolInputEl.val());
        //listArray();
    } else {
        alert("Please enter a valid symbol") // instead create a <p>Not valid symbol</p> entry
    }
})

symbolInputEl.on("keypress", function(e) {
    if(e.key === 'Enter') {
        if(symbolInputEl.val() === 'AAPL' || 'MSFT' || 'TSLA'){ //how do we get ['Global Quote']['01. symbol']?
            getPrice(symbolInputEl.val());
            searchHistory.empty();
           // listArray();
        } else if (symbolInputEl.val() === 'BTC' || 'ETH' || 'LTC') { //how about here?
            getCrypto(symbolInputEl.val());
           // listArray();
        } else {
            alert("Please enter a valid symbol")
        }
    }
})