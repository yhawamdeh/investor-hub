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
var searchHistory = $('.search-history');
var symbol = [];
var alertEl = $('#alert');

//local storage
function listArray() {
    searchStocks.push(symbolInputEl.val());
    localStorage.setItem("Symbol", (JSON.stringify(searchStocks)));
}
// function to retrieve info from stock api
function getPrice(stockSymbol){

// This is our API Key
    var APIKey = "ZPJN82R5I3MVTIE9";
    userInput = '';
// call function
    $.ajax({
        url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockSymbol + "&apikey=" + APIKey,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        $('#stocks-container').removeClass('d-none')
//results appended to index
        symbolEl.text(response['Global Quote']['01. symbol']);
        openEl.text("Open: $" + response['Global Quote']['02. open']);
        highEl.text("High: $" + response['Global Quote']['03. high']);
        lowEl.text("Low: $" + response['Global Quote']['04. low']);
        closeEl.text("Close: $" + response['Global Quote']['05. price']);
        volumeEl.text("Volume: " + response['Global Quote']['06. volume']);
        lastTradingDayEl.text(response['Global Quote']['07. latest trading day']);
        previousCloseEl.text("Previous close: " + response['Global Quote']['08. previous close']);
        changeEl.text("Change: $" + response['Global Quote']['09. change']);
        percentChangeEl.text("Percent Change: " + response['Global Quote']['10. change percent']);

    })  
}
// search button click function
searchEl.on("click", function() {
    if(symbolInputEl.val()){
        getPrice(symbolInputEl.val());

//populate localstorage array
        listArray();

    } else {
        //(symbolInputEl.val() == null ) //not working
        alertEl.append(`<p>${'Please search a valid symbol'}</p>`);
    }
})
//search button enter function
symbolInputEl.on("keypress", function(e) {
    if(e.key === 'Enter') {
        if(symbolInputEl.val()){ //how do we get ['Global Quote']['01. symbol']?
            getPrice(symbolInputEl.val());
          //  searchHistory.empty();          
            listArray();
            alertEl.textContent = "";
        } else {
            alertEl.append(`<p>${'Please search a valid symbol'}</p>`);

        }
    }
})
