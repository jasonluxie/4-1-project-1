let imageLanding = $(".image-landing");
let gameName = $(".game-name");
let gameDescription = $(".game-description");
let gameYear = $(".game-year");
let gameGenre = $(".game-genre");
let gameLink = $(".game-link");
let urlSlug;
gameLink.on("click", pageLink);

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
    let usefulInfo;
    usefulInfo =
        response.freeGames.current[response.freeGames.current.length - 1];
    console.log(usefulInfo);
    //Image
    imageLanding.attr("src", usefulInfo.keyImages[0].url);
    //Game title
    gameName.text(usefulInfo.title)
    gameDescription.text(usefulInfo.description)

    //button link
    urlSlug = usefulInfo.urlSlug;
    gameLink.attr("src", "https://www.epicgames.com/store/en-US/p/" + urlSlug);

});

function pageLink() {
    window.location.assign(
        "https://www.epicgames.com/store/en-US/p/" + urlSlug
    );
}
