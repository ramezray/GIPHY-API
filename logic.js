$(document).ready(function () {
    const API_KEY = "18yfUbbIWrZ1mvGIW4j4tWMWztdKTaUL"; //my API Key
    const URL = "https://api.giphy.com/v1/gifs/search?";
    var topics = ["Cat", "Dog", "Elephant", "Monkey", "Hamster"]; //Starting array


    $("#btnName").focus(); //will set the cursor at the input when page loads 

    for (var i = 0; i < topics.length; i++) { //for loop to display what toipcs array in buttons and than on the page
        $("#buttons").append("<button class=btnAnimal >" + topics[i] + "</button>");
    }

    $("#addBtn").on("click", function () { //creating a button when click add
        event.preventDefault(); //prevent submit btn to submit
        topics = []; //reset my array
        var textVal = $("#btnName").val().trim(); //storing val that in btn to textVal
        topics.push(textVal); // push that val to the array
        for (var i = 0; i < topics.length; i++) { //created a loop that will take all inside the array and display them 
            $("#buttons").append("<button class=btnAnimal >" + topics[i] + "</button>"); //appending each created btn to the div with id buttons
        }
        renderButtons(); //calling func
        $("#btnName").focus(); //sending cursor to the text input

    });

    //main function which will grap what is in the button and search with images related to it
    function renderButtons() {
        $(".btnAnimal").on("click", function renderButtons(event) { //this func will listne to button with class btnAmimal 
            $("#display").empty();//will make empty the display
            var theBtn = $(event.target).text();//storing the name inside the button to theBtn so i can add it to the query url
            var queryURL = URL + "api_key=" + API_KEY + "&q=" + theBtn; 

            $.ajax({ //ajax function 
                    url: queryURL,
                    method: "GET"
                })
                .then(function (response) { //creating the promise function
                    for (var j = 0; j < 10; j++) { //loop over the number of limit to display the images
                        var ImgUrl = response.data[j].images.fixed_height_still.url;
                        var imgUrlFixed = response.data[j].images.fixed_height.url
                        var ratingApi = response.data[j].rating;
                        var img_tag = $("<img>");
                        img_tag.attr("src", ImgUrl);
                        img_tag.attr("data-still", ImgUrl);
                        img_tag.attr("data-animate",imgUrlFixed );
                        img_tag.attr("class", "gif");
                        img_tag.attr("data-state", "still");

                        $("#display").append("<div><p>Rating is: " + ratingApi + "</p></div>");
                        $("#display").append(img_tag);
                        $("#display").append("<br><br>")
                        $("#btnName").focus();
                    }
                    $(".gif").on("click", function () { //the function will lisnt to the imamge click to play or stop
                        var state = $(this).attr("data-state");
                        console.log('state', state)
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                })
        })
    };
    renderButtons(); 
    $("#btnName").focus();



}); //DON NOT DELETE THIS LINE==========