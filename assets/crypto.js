//var cryptoEl = $('#crypto');
var cryptoInputEl = $('#cryptoInput');
var searchEl = $('#searchBtn');
var searchCrypto = [];
var symbolIdEl = $('#symbol-id');
var askPriceEl = $('#ask-price');
var askSizeEl = $('#ask-size');
var bidPriceEl = $('#bid-price');
var bidSizeEl = $('#bid-size');
var alertEl = $('#alert');
var searchHistory = $('.search-history');

//local storage
function listArray() {
    searchCrypto.push(cryptoInputEl.val());
    localStorage.setItem("Symbol", (JSON.stringify(searchCrypto)));
}

//function to retrieve api info for cryptocurrency
var getCrypto = function(cryptoSrc){

// This is our API Key
    var APIKey = "89FC72D5-865C-4FA3-9035-6FFB67FEF2AE";
    userInput = '';
// call function   
    $.ajax({
        url: "https://rest.coinapi.io/v1/quotes/BITSTAMP_SPOT_" + cryptoSrc + "_USD/current?apikey=" + APIKey,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
//results appended to index
        $('#stocks-container').removeClass('d-none')
        symbolIdEl.text(response['symbol_id'].match(/BITSTAMP_SPOT_([A-Z]+)_USD/)[1]);
        askPriceEl.text("Ask price: " + response['ask_price']);
        askSizeEl.text("Ask size: " + response['ask_size']);
        bidPriceEl.text("Bid price: " + response['bid_price']);
        bidSizeEl.text("Bid size: " + response['bid_size']);
    })
}

//search button click function
searchEl.on("click", function() {
    if(cryptoInputEl.val()){
        getCrypto(cryptoInputEl.val());
        searchHistory.empty();
        listArray();
    } else {
        alertEl.append('<p>Please enter a valid symbol</p>')
        console.log(alertEl);
    }
})
//search button enter function
cryptoInputEl.on("keypress", function(e) {
    if(e.key === 'Enter') {
        if(getCrypto){ //how do we get ['Global Quote']['01. symbol']?
            getCrypto(cryptoInputEl.val());
            searchHistory.empty();
            listArray();
            // alertEl.removeChild(alertEl);
            return;
        } else {
        alertEl.append('<p>Please enter a valid symbol</p>')
        }
    }
})