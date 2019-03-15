var players = ["Gritty the Mascot", "Sebastian Aho", "Pavel Datsyuk", "Brent Burns",
               "Patrick Kane", "Scott Hartnell", "Evgeni Malkin", "Stanley Cup", 
               "Joe Thornton", "Connor McDavid", "Alex Ovechkin", "Sidney Crosby", 
               "Nikita Kucherov", "Brad Marchand"];

// Function for displaying the gifs once a button has been clicked on
function displayGifs(){
        
        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific player button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var results = response.data;
          for (var i = 0; i < results.length; i++) {

            // Creating the elements, formatting the text returned by rating, and assigning a class
              var gifDiv = $("<div>");
              var p = $("<p>");
              var ratingCaps = results[i].rating.toUpperCase();
              p.text("Rating: " + ratingCaps);
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
          }
        });
      }
      
// Function for animating and freezing the gifs      
function gifAnimator(){
  var state = $(this).attr("data-state");
            
                if (state === "still"){
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                        
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
}

// On click for animating the gifs
$(document).on("click", ".individualGif", gifAnimator);

// function for displaying the buttons at the start  
function showButtons(){
    $("#buttons").empty();
    for (i=0; i<players.length; i++){
        var person = $("<button>");
        person.addClass("playerButton");
        person.addClass("btn");
        person.addClass("btn-danger");
        person.attr("data-name", players[i]);
        person.text(players[i]);
        $("#buttons").append(person);
    }
}    

// This function handles events where a player button is added
$(document).on("click", "#addNewCategory", function(event) {
    event.preventDefault();
    var person = $("#gifRequest").val().trim();
    players.push(person);
    $("input#gifRequest").val("");
    showButtons();
  });

// On click for displaying the gifs when the player's button is clicked
$(document).on("click", ".playerButton", displayGifs);

showButtons();

