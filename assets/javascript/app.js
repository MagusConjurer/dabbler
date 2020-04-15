var search = '<div class="input-group">' +
'<input type="text" class="form-control" placeholder="Movies" id="userInput">' + 
'<button class="btn btn-outline-dark" type="button" id="searchButton">Search</button>' +
'</div>';

var loginForm = '<form class="form-inline">' +
'<div class="input2 pl-4">'+
    '<span class="input-group-text" id="basic-addon1">Username: </span>' +
'</div>' +
'<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">' +
'<div class="input2 pl-4">'+ 
  '<span class="input-group-text" id="basic-addon2">Password: </span>' +
'</div>' +
'<input type="text" class="form-control mr-4" placeholder="--------" aria-label="Password" aria-describedby="basic-addon2">' +
'</div>' +
'<button type="button" class="btn btn-dark" id="submitBtn">Submit</button>' +
'<button type="button" class="btn btn-info" id="newBtn">New User</button>' +
'</form>';

$("#movieButton").click(function () {getMovies()});
$("#musicButton").click(function () {getMusic()});
$("#booksButton").click(function () {getBooks()});
$("#gamesButton").click(function () {getGames()});

function addLogin(){
  $(".navbar").empty();
  $(".navbar").append(loginForm);
};

addLogin();

function signedIn(){
  $(".navbar").empty();
  var brand = '<a class="navbar-brand" href="#">Dabbler</a>' +
  '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
  '</button>';
  var altMarkup = $("<div>").addClass("collapse navbar-collapse").attr("id", "navbarNavAltMarkup");
  var signedNav = $("<div>").addClass("navbar-nav");
  var user = $("<a>").addClass("nav-item nav-link active").attr("href", "").text("Test Account");
  var recent = $("<a>").addClass("nav-item nav-link").attr("href", "").text("Recent");
  var logout = $("<button>").addClass("btn btn-dark").attr({type:"button", id:"logoutBtn"}).text("Logout");
  signedNav.append(user, recent, logout);
  altMarkup.append(signedNav);
  $(".navbar").append(brand, altMarkup);
};

$(document).on("click", "#submitBtn", function(event){
  event.preventDefault();
  signedIn();
});

$(document).on("click", "#logoutBtn", function(event){
  event.preventDefault();
  addLogin();
});

$(document).on("click", "#submitNew", function(event){
  event.preventDefault();
  signedIn();
  $("#myModal").css("display", "none");
});

$(document).on("click", "#newBtn", function(){
  // When the user clicks the button, open the modal 
  $("#myModal").css("display", "block");
});
$(document).on("click", ".close", function(){
  // When the user clicks on <span> (x), close the modal
  $("#myModal").css("display", "none");
});

function getMovies(){
    //need to clear search box and results with each button click
    $("#searchBox").empty()
    $("#resultsBox").empty();
    $("#searchBox").append(search);
    $("#userInput").attr("placeHolder", "Movies");
    
}
function getMusic(){
    $("#searchBox").empty()
    $("#resultsBox").empty();
    $("#searchBox").append(search);
    $("#userInput").attr("placeHolder", "Music");
}
function getBooks(){
    $("#searchBox").empty()
    $("#resultsBox").empty();
    $("#searchBox").append(search);
    $("#userInput").attr("placeHolder", "Books");
}
function getGames(){
    $("#searchBox").empty()
    $("#resultsBox").empty();
    $("#searchBox").append(search);
    $("#userInput").attr("placeHolder", "Games");
}

function createCards(input){
  $("#resultsBox").empty();
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

function displayResults() {
    var resultsArray = "";
    var searchVal = $("#userInput").val();
    var queryUrl = "https://tastedive.com/api/similar?q=" + searchVal + "&type=" + $("#userInput").attr('placeholder') + "&k=363702-JoshDunc-DVBUOX50&info=1";
   
    console.log(queryUrl);

    $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
      console.log(response);
      
    });
  }
function displayMusic(){
  var searchVal = $("#userInput").val();
  var queryUrl = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + searchVal + "&limit=10&api_key=ac29ff72d476b886824646dcd2eeea95&format=json";
    
  $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
    console.log(response)
      
    for (i = 0; i < response.similarartists.artist.length; i++) {
      console.log(i);
      var musicUrl = response.similarartists.artist[i].url;
      $(".card-footer").text(musicUrl);
        //gifDiv.append(displayRating);
        
        // var animateGifs = response.data[i].images.fixed_height_downsampled.url;
        // var displayGifs = $("<img>").attr("src", gifs);
        // displayGifs.attr("still-image", gifs);
        // displayGifs.attr("looping-image", animateGifs);
        // displayGifs.attr("state", "still");
        // gifDiv.append(displayGifs);

        // var rating = response.data[i].rating;
        // var displayRating = $("<p>").text("Rating: " + rating);
        // gifDiv.append(displayRating);

        // $("#gifsView").prepend(gifDiv);

      };
    });
  };
$(document).on("click", "#searchButton", function(event) {
  console.log("Worked");
  event.preventDefault();
  var userInput = $("#userInput").val();
  console.log(userInput)
  createCards(userInput);
  displayMusic();
});
