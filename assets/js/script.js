let gameLandingImage = $("#game-landing_image");
let usefulInfo;

var userInput = $(".user-input");
var userSubmit = $(".user-submit");
var userHolder;

let modalBackground = $(".modal-background");
let modalCloseButton = $(".modal-close");
let modalUnderstand = $(".modal-understand");
let modalContainer = $(".modal-container");
let modalOpen = $(".modal-open");

modalBackground.on("click", modalToggle);
modalCloseButton.on("click", modalToggle);
modalUnderstand.on("click", modalToggle);
modalOpen.on("click", modalToggle);

userSubmit.on("click", getuserInput);

$.ajax({
    async: true,
    crossDomain: true,
    url: "https://free-epic-games.p.rapidapi.com/free",
    method: "GET",
    headers: {
        "x-rapidapi-host": "free-epic-games.p.rapidapi.com",
        "x-rapidapi-key": "f183092705msh93b90028667e3ddp1b7577jsn9d0ef1f397d8",
    },
}).then(function (response) {
    usefulInfo =
        response.freeGames.current[response.freeGames.current.length - 1];
    // console.log(usefulInfo);
    gameLandingImage.attr("src", usefulInfo.keyImages[0].url);
});



function gameComparison(freeGameName) {
    $.ajax({
        url:
            "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=D83EC65C49F2C1AD89A24EA9844B0EBF&steamid=" +
            userHolder +
            "&include_appinfo=true&format=json",
        method: "GET",
    }).then(function (response) {
        console.log(response.response.games);
        console.log(freeGameName)
        for (let i = 0; i < response.response.games.length; i++) {
            if ((freeGameName = response.response.games[i].name)) {
                let userConfirm = confirm(
                    "You already own this game, would you still like to claim the game on the Epic Games Store?"
                );
                if (userConfirm == true) {
                    window.location.replace("./game-information.html");
                }
            } else alert("You do not own this game, click ahead to claim!");
            window.location.replace("./game-information.html");
        }
    });
}

function getuserInput() {
    userHolder = document.querySelector(".user-input").value;
    gameComparison(usefulInfo.title);
    // console.log(userInput);
    // console.log(userHolder);
}

function modalToggle() {
    modalContainer.toggleClass("is-active");
}
