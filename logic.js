$(document).ready(function () {
    const API_KEY = "18yfUbbIWrZ1mvGIW4j4tWMWztdKTaUL"; //my API Key
    const URL = "https://api.giphy.com/v1/gifs/search?";
    var topics = ["Cat", "Dog", "Elephant", "Monkey", "Hamster"]; //Starting array


    $("#btnName").focus(); //will set the cursor at the input when page loads 

    for (var i = 0; i < topics.length; i++) { //for loop to display what toipcs array in buttons and than on the page
        $("#buttons").append("<button class=btnAnimal >" + topics[i] + "</button>");
    }

    $("#addBtn").on("click", function () { //creating a button when click add
        event.preventDefault();
        topics = [];
        var textVal = $("#btnName").val();
        topics.push(textVal);
        for (var i = 0; i < topics.length; i++) {
            $("#buttons").append("<button class=btnAnimal >" + topics[i] + "</button>");
        }
        renderButtons();
        $("#btnName").focus();

    });

    //main function which will grap what is in the button and search with images related to it
    function renderButtons() {
        $(".btnAnimal").on("click", function renderButtons(event) {
            $("#display").empty();
            var theBtn = $(event.target).text();
            var queryURL = URL + "api_key=" + API_KEY + "&q=" + theBtn;
            console.log(queryURL);

            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .then(function (response) {
                    for (var j = 0; j < 5; j++) {
                        var ImgUrl = response.data[j].images.fixed_height_still.url;
                        var imgUrlFixed = response.data[j].images.fixed_height.url
                        console.log(ImgUrl);
                        console.log(imgUrlFixed);
                        var ratingApi = response.data[j].rating;
                        var img_tag = $("<img>");
                        img_tag.attr("src", ImgUrl);
                        img_tag.attr("data-still", ImgUrl);
                        img_tag.attr("data-animate",imgUrlFixed );
                        img_tag.attr("class", "gif");
                        img_tag.attr("data-state", "still");

                        $("#display").append("<div><p>Rating is: " + ratingApi + "</p></div>");

                        $("#display").append(img_tag);
                            // "<div>The Iamge: <img class=.gif src=" + ImgUrl + " data-still=" + ImgUrl + "data-animate=" + imgUrlFixed + "data-state= still ></div>");

                        $(".gif").on("click", function () {
                            var state = $(this).attr("data-state");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        });

                        $("#display").append("=========================================================")
                        $("#btnName").focus();

                    }


                })
        })
    };
    renderButtons();
    $("#btnName").focus();



}); //DON NOT DELETE THIS LINE==========