var searchEl = $('#searchBtn');
var symbolInputEl = $('#symbolInput');
var symbolEl = $('#symbol');
// var cryptoEl = $('#crypto');
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
// var searchCrypto = [];
var searchHistory = $('.search-history');
//var symbol = stockSymbol;


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

    })  
}

// function getCrypto(cryptoSrc){
//     // This is our API Key
//     var APIKey = "89FC72D5-865C-4FA3-9035-6FFB67FEF2AE";
//     userInput = '';
    
//     $.ajax({
//         url: "https://rest.coinapi.io/v1/quotes/BITSTAMP_SPOT_" + cryptoSrc + "_USD/current?apikey=" + APIKey,
//         method: "GET"
//     })
//     .then(function(response) {
//         console.log(response);
//         cryptoEl.text("Ask price: " + response['ask_price']);
//         // cryptoEl.text(response['ask_price']);
//         // cryptoEl.text(response['ask_price']);
//         // cryptoEl.text(response['ask_price']);
//     })
// }

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
    if(symbolInputEl.val() === symbolInputEl.val()){
        getPrice(symbolInputEl.val());
        listArray();
        // localStorage.setItem("input", JSON.stringify(searchResults));
    // } else if (symbolInputEl.val() === 'AAPL') {
    //     searchHistory.empty();
    //     getCrypto(symbolInputEl.val());
    //     //listArray();
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