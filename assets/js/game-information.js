let imageLanding = $(".image-landing");
let gameName = $(".game-name");
let gameDescription = $(".game-description");
let gameYear = $(".game-year");
let gameGenre = $(".game-genre");
let gameLink = $(".game-link");
let gameNews = $(".empty-container");
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
    // console.log(usefulInfo);
    //Image
    imageLanding.attr("src", usefulInfo.keyImages[0].url);
    //Game title
    gameName.text(usefulInfo.title);
    gameDescription.text(usefulInfo.description);

    //button link
    urlSlug = usefulInfo.urlSlug;
    gameLink.attr("src", "https://www.epicgames.com/store/en-US/p/" + urlSlug);
});

function getGamesNews() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=236850&count=3&maxlength=300&format=json",
        method: "GET",
    }).then(function (response) {
        // console.log(response.appnews.newsitems[0].contents);
        for (let i = 0; i < response.appnews.newsitems.length; i++) {
            let newsTitle = $('<h2>' + response.appnews.newsitems[i].title + '</h2>')
            let newsContent = $('<p>' + response.appnews.newsitems[i].contents + '</p>')
            let newsLink = ('<a href="' + response.appnews.newsitems[i].url + '"> Click to read more </a>')
            let newsCard = $('<div class="news-card"></div>')
            newsCard.append(newsTitle)
            newsCard.append(newsContent)
            newsCard.append(newsLink)
            gameNews.append(newsCard)
        }
    });
}
getGamesNews();
function pageLink() {
    window.location.assign(
        "https://www.epicgames.com/store/en-US/p/" + urlSlug
    );
}
