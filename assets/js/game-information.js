let imageLanding = $(".image-landing");
let gameName = $(".game-name");
let gameDescription = $(".game-description");
let gameYear = $(".game-year");
let gameWebsite = $(".game-website");
let gamePrice = $(".game-price");
let gameGenre = $(".game-genre");
let gameScore = $(".game-score");
let gameLink = $(".game-link");
let gameVideo = $('.game-video')
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
    //Image
    imageLanding.attr("src", usefulInfo.keyImages[0].url);
    //Game title
    gameName.text(usefulInfo.title);
    gameDescription.text(usefulInfo.description);
    //button link
    urlSlug = usefulInfo.urlSlug;
    gameLink.attr("src", "https://www.epicgames.com/store/en-US/p/" + urlSlug);
    let gameTitle = usefulInfo.title;

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

function getGamesInfo() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails?appids=236850",
        method: "GET",
    }).then(function (response) {
        gameYear.text(
            "Release Date: " + response[236850].data.release_date.date
        );
        gameWebsite.html(
            "Website: <a target='_blank' href='" +
                response[236850].data.website +
                "'>" +
                response[236850].data.website +
                "</a>"
        );
        gamePrice.text(
            "Regular Price: " +
                response[236850].data.price_overview.final_formatted
        );
        gameScore.html(
            '<a href ="' +
                response[236850].data.metacritic.url +
                '"> Metacritic </a>Score: ' +
                response[236850].data.metacritic.score
        );
        for (let i = 0; i < response[236850].data.genres.length; i++) {
            gameGenre.append(
                "<li class='ml-5 is-size-5'>" +
                    response[236850].data.genres[i].description +
                    "</li>"
            );
        }
        console.log(response[236850].data.movies[1].mp4[480]);
        gameVideo.attr('src', response[236850].data.movies[1].mp4[480])
        gameVideo.attr('type', "video/mp4")
    });
}

function pageLink() {
    window.location.assign(
        "https://www.epicgames.com/store/en-US/p/" + urlSlug
    );
}

function getGamesNews() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=236850&count=3&maxlength=300&format=json",
        method: "GET",
    }).then(function (response) {
        for (let i = 0; i < response.appnews.newsitems.length; i++) {
            let newsTitle = $(
                '<h2 class="is-size-4 news-title" >' +
                    response.appnews.newsitems[i].title +
                    "</h2>"
            );
            let newsContent = $(
                '<p class="is-size-5 news-text">' +
                    response.appnews.newsitems[i].contents +
                    "</p>"
            );
            let newsLink =
                '<a class="is-size-6 news-link" href="' +
                response.appnews.newsitems[i].url +
                '"> Click to read more </a>';
            let newsCard = $('<div class="news-card mb-5"></div>');
            newsCard.append(newsTitle);
            newsCard.append(newsContent);
            newsCard.append(newsLink);
            gameNews.append(newsCard);
        }
    });
}