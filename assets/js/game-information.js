let imageLanding = $(".image-landing");
let gameName = $(".game-name");
let gameDescription = $(".game-description");
let gameYear = $(".game-year");
let gameGenre = $(".game-genre");
let gameLink = $(".game-link");
let gameNews = $(".empty-container");
let urlSlug;
let gameAppID;
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
    gameName.text(usefulInfo.title);
    gameDescription.text(usefulInfo.description);
    //button link
    urlSlug = usefulInfo.urlSlug;
    gameLink.attr("src", "https://www.epicgames.com/store/en-US/p/" + urlSlug);
    let gameTitle = usefulInfo.title;
    // console.log(gameTitle);
    // findGameByID(gameTitle)
    getGamesNews();
    getGamesInfo();
});

// function findGameByID(gameName) {
//     $.ajax({
//     url: "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json",
//     method: 'GET',
//     }).then(function (response) {
//         for (let i = 0; i < response.applist.apps.length; i++) {
//             if (gameName == response.applist.apps[i].name) {
//                 gameAppID = response.applist.apps[i].appid
//             } else return console.log("There is no game on steam by that name")
//         }
//     });
// }

function getGamesNews() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=236850&count=3&maxlength=300&format=json",
        method: "GET",
    }).then(function (response) {
        // console.log(response.appnews.newsitems[0].contents);
        for (let i = 0; i < response.appnews.newsitems.length; i++) {
            let newsTitle = $(
                '<h2 class="is-size-4" >' +
                    response.appnews.newsitems[i].title +
                    "</h2>"
            );
            let newsContent = $(
                '<p class="is-size-6">' +
                    response.appnews.newsitems[i].contents +
                    "</p>"
            );
            let newsLink =
                '<a class="is-size-6" href="' +
                response.appnews.newsitems[i].url +
                '"> Click to read more </a>';
            let newsCard = $('<div class="news-card mb-2"></div>');
            newsCard.append(newsTitle);
            newsCard.append(newsContent);
            newsCard.append(newsLink);
            gameNews.append(newsCard);
        }
    });
}

function getGamesInfo() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails?appids=236850",
        method: "GET",
    }).then(function (response) {
        // console.log(response[236850])
        gameYear.text("Release Date: " + response[236850].data.release_date.date)
        // console.log(gameYear)
        for (let i = 0; i < response[236850].data.genres.length; i++) {
            // console.log(response[236850].data.genres[i].description)
            gameGenre.append("<li class='ml-5'>" + response[236850].data.genres[i].description + "</li>")  
        }
    });
}

function pageLink() {
    window.location.assign(
        "https://www.epicgames.com/store/en-US/p/" + urlSlug
    );
}
