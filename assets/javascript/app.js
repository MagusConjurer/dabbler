var movieSearch = '<div class="input-group">' +
'<input type="text" class="form-control" placeholder="Movies" id="movieInfo">' + 
'<button class="btn btn-outline-dark" type="button" id="searchButton">Search</button>' +
'</div>';
var musicSearch = '<div class="input-group">' +
'<input type="text" class="form-control" placeholder="Music" id="musicInfo">' + 
'<button class="btn btn-outline-dark" type="button" id="searchButton">Search</button>' +
'</div>';
var booksSearch = '<div class="input-group">' +
'<input type="text" class="form-control" placeholder="Books" id="booksInfo">' + 
'<button class="btn btn-outline-dark" type="button" id="searchButton">Search</button>' +
'</div>';
var gamesSearch = '<div class="input-group">' +
'<input type="text" class="form-control" placeholder="Games" id="gamesInfo">' + 
'<button class="btn btn-outline-dark" type="button" id="searchButton">Search</button>' +
'</div>';
//var movieName = "";

$("#movieButton").click(function () {getMovies()});
$("#musicButton").click(function () {getMusic()});
$("#booksButton").click(function () {getBooks()});
$("#gamesButton").click(function () {getGames()});

function getMovies(){
    //need to clear search box and results with each button click
    $("#searchBox").empty()
    $("#searchBox").append(movieSearch);
}
function getMusic(){
    $("#searchBox").empty()
    $("#searchBox").append(musicSearch);
}
function getBooks(){
    $("#searchBox").empty()
    $("#searchBox").append(booksSearch);
}
function getGames(){
    $("#searchBox").empty()
    $("#searchBox").append(gamesSearch);
}

function createCards(input){
  var deck = $("<div>").addClass("card-deck");
  for(var i = 0; i < 10; i++){
    var cardColumn = $("<div>").addClass("col-sm-6");
    var newCard = $("<div>").addClass("card");
    var cardImage = $("<img>").addClass("card-img-top").attr("alt", "...");
    var cardBody = $("<div>").addClass("card-body");
    var cardName = $("<h5>").addClass("card-title").text(input);
    var cardTeaser = $("<p>").addClass("card-text");
    var cardLink = $("<div>").addClass("card-footer").html("<small class='text-muted'>Last updated 3 mins ago</small>");

    cardBody.append(cardName,cardTeaser,cardLink);
    newCard.append(cardImage, cardBody);
    cardColumn.append(newCard);
    deck.append(cardColumn);
  }
  $("#resultsBox").append(deck);
}

// function displayMovies() {
//     $("#resultsBox").empty();
//     var movieName = ""
//     var queryUrl = "https://tastedive.com/api/similar?q=" + movieName + "&type=movies&k=363702-JoshDunc-DVBUOX50&info=1";
   
//     $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
//         console.log(response);
//     })
// }
$(document).on("click", "#searchButton", function(event) {
  console.log("Worked");
  event.preventDefault();
  var movieName = $("#movieInfo").val().trim();
  console.log(movieName)
  createCards();
});
