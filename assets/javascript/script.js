

var players = ["Gritty the Mascot", "Sebastian Aho", "Pavel Datsyuk", "Brent Burns", "Joe Thornton", "Connor McDavid", "Alex Ovechkin", "Sidney Crosby"];
console.log("var players has been read");

// Function for displaying the gifs once a button has been clicked on
function displayGifs(){
    console.log("displayGifs has started");
        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific player button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var results = response.data;
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
              var p = $("<p>");
              p.text("Rating: " + results[i].rating);
              var gif = $("<img>");
              gif.addClass("individualGif");

            //   Adding src="still gif" data-still="still gif" data-animate="animated gif" data-state="still"
              gif.attr("src", results[i].images.fixed_height_still.url); 
              gif.attr("data-still", results[i].images.fixed_height_still.url);
              gif.attr("data-animate", results[i].images.fixed_height.url);
              gif.attr("data-state", "still");

            //   Adding the gifs and ratings to the page
              gifDiv.append(gif);
              gifDiv.append(p);
              $("#gifViewer").prepend(gifDiv);
              console.log("displayGifs has ended");
          }
          // On click for animating the gifs
              $(document).on("click", ".individualGif", function(){
                console.log("individualGif on click has started")
                var state = $(this).attr("data-state");
            
                if (state === "still"){
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                        
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                console.log("individualGif on click has ended");
            });
          
        });
      }

    // function for displaying the buttons at the start  
function showButtons(){
    console.log("function showButtons has started");
    $("#buttons").empty();
    for (i=0; i<players.length; i++){
        var person = $("<button>");
        person.addClass("playerButton");
        person.addClass("btn");
        person.addClass("btn-dark");
        person.attr("data-name", players[i]);
        person.text(players[i]);
        $("#buttons").append(person);
        console.log("function showButtons has ended");
    }
}    

    // This function handles events where a player button is clicked
$(document).on("click", "#addNewCategory", function(event) {
    console.log("on click for adding a new button has started");
    event.preventDefault();
    var person = $("#gifRequest").val().trim();
    players.push(person);
    showButtons();
    console.log("on click for adding a new button has ended");
  });

// On click for displaying the gifs when the player's button is clicked
$(document).on("click", ".playerButton", displayGifs);

showButtons();
console.log("We have reached the end of the page");

