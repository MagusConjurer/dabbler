var search = '<div class="input-group">' +
  '<input type="text" class="form-control" placeholder="Movies" id="userInput">' +
  '<button class="btn btn-outline-dark" type="button" id="searchButton">Search</button>' +
  '</div>';

var loginForm = '<form class="form-inline">' +
  '<div class="input2 pl-4">' +
  '<span class="input-group-text" id="basic-addon1">Username: </span>' +
  '</div>' +
  '<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">' +
  '<div class="input2 pl-4">' +
  '<span class="input-group-text" id="basic-addon2">Password: </span>' +
  '</div>' +
  '<input type="text" class="form-control mr-4" placeholder="--------" aria-label="Password" aria-describedby="basic-addon2">' +
  '</div>' +
  '<button type="button" class="btn btn-dark" id="submitBtn">Submit</button>' +
  '<button type="button" class="btn btn-info" id="newBtn">New User</button>' +
  '</form>';

var resultsArray = [];

$("#movieButton").click(function () { getMovies() });
$("#musicButton").click(function () { getMusic() });
$("#booksButton").click(function () { getBooks() });
$("#gamesButton").click(function () { getGames() });

function addLogin() {
  $(".navbar").empty();
  $(".navbar").append(loginForm);
};

addLogin();

function signedIn() {
  $(".navbar").empty();
  var brand = '<a class="navbar-brand" href="#">Dabbler</a>' +
    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>';
  var altMarkup = $("<div>").addClass("collapse navbar-collapse").attr("id", "navbarNavAltMarkup");
  var signedNav = $("<div>").addClass("navbar-nav");
  var user = $("<a>").addClass("nav-item nav-link active ml").attr("href", "").text("Test Account");
  var recent = $("<a>").addClass("nav-item nav-link").attr("href", "").text("Recent");
  var logout = $("<button>").addClass("btn btn-dark").attr({ type: "button", id: "logoutBtn" }).text("Logout");
  signedNav.append(user, recent, logout);
  altMarkup.append(signedNav);
  $(".navbar").append(brand, altMarkup);
};

$(document).on("click", "#submitBtn", function (event) {
  event.preventDefault();
  signedIn();
});

$(document).on("click", "#logoutBtn", function (event) {
  event.preventDefault();
  addLogin();
});

$(document).on("click", "#submitNew", function (event) {
  event.preventDefault();
  signedIn();
  $("#myModal").css("display", "none");
});

$(document).on("click", "#newBtn", function () {
  // When the user clicks the button, open the modal 
  $("#myModal").css("display", "block");
});
$(document).on("click", ".close", function () {
  // When the user clicks on <span> (x), close the modal
  $("#myModal").css("display", "none");
});

function getMovies() {
  //need to clear search box and results with each button click
  $("#searchBox").empty()
  $("#resultsBox").empty();
  $("#searchBox").append(search);
  $("#userInput").attr("placeHolder", "Movies");

}
function getMusic() {
  $("#searchBox").empty()
  $("#resultsBox").empty();
  $("#searchBox").append(search);
  $("#userInput").attr("placeHolder", "Music");
}
function getBooks() {
  $("#searchBox").empty()
  $("#resultsBox").empty();
  $("#searchBox").append(search);
  $("#userInput").attr("placeHolder", "Books");
}
function getGames() {
  $("#searchBox").empty()
  $("#resultsBox").empty();
  $("#searchBox").append(search);
  $("#userInput").attr("placeHolder", "Games");
}

function displayResults() {
  $("#resultsBox").empty();
  var deck = $("<div>").addClass("card-deck");
  var searchVal = $("#userInput").val();
  var queryUrl = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + searchVal + "&type=" + $("#userInput").attr('placeholder') + "&k=363702-JoshDunc-TBJLDDGT&info=1";


  $.ajax({ url: queryUrl, method: "GET" }).then(function (response) {
    resultsArray = [];
    for (var i = 0; i < 10; i++) {
      resultsArray.push(response.Similar.Results[i].Name);
    }

    if($("#userInput").attr("placeHolder") == "Movies"){
      var queryUrl = "";
      for (var j = 0; j < 10; j++) {
        queryUrl = "" + resultsArray[j] + "";
        
        $.ajax({ url: queryUrl, method: "GET" }).then(function (response) {
          var title = "";
          var url = "";
          var image = "";

          var newColumn = createCard(title, url, image);
          deck.append(newColumn);
        });
      }
      $("#resultsBox").append(deck);
    }else if ($("#userInput").attr("placeHolder") == "Music") {
      var queryUrl = "";
      for (var j = 0; j < 10; j++) {
        queryUrl = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + resultsArray[j] + "&api_key=ac29ff72d476b886824646dcd2eeea95&format=json";
        $.ajax({ url: queryUrl, method: "GET" }).then(function (response) {
          var title = response.artist.name;
          var url = response.artist.url;
          var image = "https://rockymountevents.com/wp-content/uploads/2019/06/Concert-crowd-with-silhouettes-of-people-hold-their-hands-up.jpg";

          var newColumn = createCard(title, url, image);
          deck.append(newColumn);
        });
      }
      $("#resultsBox").append(deck);
    }else if($("#userInput").attr("placeHolder") == "Books"){
      var queryUrl = "";
      for (var j = 0; j < resultsArray.length; j++) {
        queryUrl = "https://www.googleapis.com/books/v1/volumes?q=" + resultsArray[j] + "&key=AIzaSyDWyfBS-uIsXX43Lj_Eu0WukD9mRYdNGxw";
        $.ajax({ url: queryUrl, method: "GET" }).then(function (response2) {
          var title = response2.items[0].volumeInfo.title;
          var url = response2.items[0].volumeInfo.canonicalVolumeLink;
          var image = response2.items[0].volumeInfo.imageLinks.thumbnail;
          
          var newColumn = createCard(title, url, image);
          deck.append(newColumn);
        });
        
      }
      $("#resultsBox").append(deck);
    }else if($("#userInput").attr("placeHolder") == "Games"){
      var queryUrl = "";
      for (var j = 0; j < 10; j++) {
        $.ajax({ 
          url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games?search=" + resultsArray[j] + "&fields=name,cover,websites", 
          method: "GET", 
          headers: {
            'Accept': 'application/json',
            'user-key': '8c7e7f3b8ffb943b611bba109741ac8d'
          }
          }).then(function (gameRes) {
            var url = "";
            var image = "";
            var title = gameRes[0].name;
            var website = gameRes[0].websites[0];
            var cover = gameRes[0].cover;
            if(website != undefined){
              $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/websites/" + website + "?fields=url", 
                method: "GET", 
                headers: {
                  'Accept': 'application/json',
                  'user-key': '8c7e7f3b8ffb943b611bba109741ac8d'
                }
              }).then(function(webRes){
                url = webRes[0].url;
                if(url == undefined){
                  url = webRes.url;
                };
                if(cover != undefined){
                  $.ajax({ 
                    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers/" + cover + "?fields=url", 
                    method: "GET", 
                    headers: {
                      'Accept': 'application/json',
                      'user-key': '8c7e7f3b8ffb943b611bba109741ac8d'
                    }
                  }).then(function(imageRes){
                    image = "https:" + imageRes[0].url;
                    var newColumn = createCard(title, url, image);
                    deck.append(newColumn);
                  });    
                };
              });
            } 
        });
      }
      $("#resultsBox").append(deck);
    }
    
  });

}

function createCard(title, url, image) {
  var cardColumn = $("<div>").addClass("col-sm-6");
  var newCard = $("<div>").addClass("card");
  var cardImage = $("<img>").addClass("card-img-top").attr({alt: "...", src: image});
  var cardBody = $("<div>").addClass("card-body");
  var cardName = $("<h5>").addClass("card-title").text(title);
  var cardTeaser = $("<p>").addClass("card-text");
  var cardLink = $("<div>").addClass("card-footer").html("<small class='text-muted'>" + "<a href='" + url + "'" + ">" + url + "</a>" + "</small>");

  cardBody.append(cardName, cardTeaser, cardLink);
  newCard.append(cardImage, cardBody);
  cardColumn.append(newCard);
  return cardColumn;
}

$(document).on("click", "#searchButton", function (event) {
  event.preventDefault();
  displayResults();
});

var granimInstance = new Granim({
  element: '#logo-canvas',
  direction: 'left-right',
  states : {
      "default-state": {
          gradients: [
              ['#EB3349', '#F45C43'],
              ['#FF8008', '#FFC837'],
              ['#4CB8C4', '#3CD3AD'],
              ['#24C6DC', '#514A9D'],
              ['#FF512F', '#DD2476'],
              ['#DA22FF', '#9733EE']
          ],
          transitionSpeed: 2000
      }
  }
});