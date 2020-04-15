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

// function displayMovies() {
//     $("#resultsBox").empty();
//     var movieName = ""
//     var queryUrl = "https://tastedive.com/api/similar?q=" + movieName + "&type=movies&k=363702-JoshDunc-DVBUOX50&info=1";
   
//     $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
//         console.log(response);
//     })
// }
$(document)
$("#searchButton").on("click", function(event) {
    console.log("Worked");
    event.preventDefault();
    var movieName = $("#movieInfo").val().trim();
    console.log(movieName)
});
