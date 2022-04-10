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

function listArray() {
    searchCrypto.push(cryptoInputEl.val());
    localStorage.setItem("Symbol", (JSON.stringify(searchCrypto)));
}


//function to retrieve api info for cryptocurrency
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
    //results appended to index
        symbolIdEl.text(response['symbol_id']);
        askPriceEl.text("Ask price: " + response['ask_price']);
        askSizeEl.text("Ask size: " + response['ask_size']);
        bidPriceEl.text("Bid price: " + response['bid_price']);
        bidSizeEl.text("Bid size: " + response['bid_size']);
    })
}


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

cryptoInputEl.on("keypress", function(e) {
    if(e.key === 'Enter') {
        if(cryptoInputEl.val()){ //how do we get ['Global Quote']['01. symbol']?
            getCrypto(cryptoInputEl.val());
            searchHistory.empty();
            listArray();
        } else {
        alertEl.append('<p>Please enter a valid symbol</p>')

        }
    }
})
