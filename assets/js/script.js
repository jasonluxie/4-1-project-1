let gameLandingImage = $("#game-landing_image");
let usefulInfo;
var userInput = $(".user-input");
var userSubmit = $(".user-submit");
let userConfirm = $("#user-confirm");
let userConfirmText = $(".user-confirm_text");
let userHolder;
let modalBackground = $(".modal-background");
let modalCloseButton = $(".modal-close");
let modalUnderstand = $(".modal-understand");
let modalContainer = $(".modal-container");
let modalOpenButton = $(".modal-open");
let modalContinue = $(".continue-button");

modalBackground.on("click", modalClose);
modalCloseButton.on("click", modalClose);
modalUnderstand.on("click", modalClose);
modalOpenButton.on("click", modalOpen);

modalContinue.on("click", nextPage);

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
        console.log(response);
        // console.log(response.response.games);
        // console.log(freeGameName);
        for (let i = 0; i < response.response.games.length; i++) {
            if (freeGameName == response.response.games[i].name) {
                userConfirm.toggleClass("is-active");
                userConfirmText.text(
                    "You already own this game in your steam library, would you still like to claim the game on the epic games store?"
                );
            } else userConfirm.toggleClass("is-active");
            $(".cancel-button").hide();
            userConfirmText.text(
                "You do not own this game, click 'continue' to claim!"
            );
        }
    });
}

function getuserInput() {
    userHolder = document.querySelector(".user-input").value;
    gameComparison(usefulInfo.title);
}

function modalClose() {
    if (modalContainer.hasClass("is-active")) {
        modalContainer.toggleClass("is-active");
    }
    if (userConfirm.hasClass("is-active")) {
        userConfirm.toggleClass("is-active");
    }
}

function modalOpen() {
    if (!modalContainer.hasClass("is-active")) {
        modalContainer.toggleClass("is-active");
    } 
}

function nextPage() {
    window.location.assign("./game-information.html");
}
