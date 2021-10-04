let gameLandingImage = $("#game-landing_image");
let usefulInfo;
let modalBackground = $(".modal-background");
let modalCloseButton = $(".modal-close");
let modalUnderstand = $(".modal-understand");
let modalContainer = $(".modal-container");
let modalOpen = $('.modal-open')

modalBackground.on('click', modalToggle)
modalCloseButton.on('click', modalToggle)
modalUnderstand.on('click', modalToggle)
modalOpen.on('click', modalToggle)

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

// $.ajax({
// url: ,
// method: 'GET',
// }).then(function (response) {});

function modalToggle() {
    modalContainer.toggleClass('is-active')
}