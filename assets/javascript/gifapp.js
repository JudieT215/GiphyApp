// var with all the option to make buttons
 $(document).ready(function() {

    //array to hold topics
var food = ["taco", "sushi", "curry", "pizza","fried chicken" ];
//for loop to make buttons for topic from food array
function makeBtn(){
 
$("#gifButtons").empty();

for (i = 0; i < food.length; i++){
    var foodBtn = $("<button>");
    //adding a class to the button
    foodBtn.addClass("btn btn-success btn-style btn-style");
    //adding a id to each button
    foodBtn.attr("id", "button-", 1+i );
    //adding a data attr to each button
    foodBtn.attr("data-food", food[i]);
    //changing the DOM with each button
    foodBtn.text(food[i]);
    //adding each button to the right section by appending it to the ID
    $("#gifButtons").append(foodBtn);
}
};

makeBtn();

//make each current button clickable

//attaching the value to the button

$("button").on("click", function() {
    var dataFood = $(this).attr("data-food");

    var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    dataFood +
    "&api_key=lQrl8SUYfRHaQoWl00BJXuQoipXwB1lz&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
    // After the data comes back from the API
  
      var results = response.data;
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "image"
          var gifDiv = $("<div class='image'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var foodImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          foodImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(foodImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gif-results").prepend(gifDiv);

          console.log("clicked " + dataFood);
        }
        }
      });
    

    //add a new food option, this has some bugs. I can only add a new button after i click a button. The new button will not be a serach term....
  $("#addNewFood").on("click", function() {
    event.preventDefault();  
    var newFood = $("#newFood").val().trim();

     
        food.push(newFood);
        makeBtn();
       
        console.log(food);
  });

     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
});
})
