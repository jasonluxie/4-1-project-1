# 4-1-project-1-Epic-Store-Checker
## Deployed Application
https://jasonluxie.github.io/4-1-project-1/
## Description
By inputting your steam ID into this application, you can check weather if in your steam library you own the current free Epic Games game of the week. Some relevant information about the game is also provided, in case you aren't interested in the current free game. 
## Notes IMPORTANT
* You must request access by pressing the button from [this website](https://cors-anywhere.herokuapp.com/) to be able to access the steam API
* If you need a steam ID to use, feel free to use this one: 76561197996475774
## Demonstation
![Demonstration of application, checking modals for instructions, then inputting ID leads to redirect of information page which includes information and a button to link to the game page.](./assets/images/project-demo-gif.gif)
## Libraries Used
* [Jquery](https://jquery.com/)
* [Bulma](https://bulma.io/) 
## APIs Used
* [Epic Games Free Game Information](https://rapidapi.com/thekevinconnor@gmail.com/api/free-epic-games/)
* [Steam User Owned Games](https://developer.valvesoftware.com/wiki/Steam_Web_API#GetOwnedGames_.28v0001.29)
* [Steam Game Information](https://partner.steamgames.com/doc/webapi/ISteamApps)
* [Steam Game News](https://partner.steamgames.com/doc/webapi/ISteamNews)
## Contributing Members
* [jasonluxie](https://github.com/jasonluxie)
* [FunnyVirus](https://github.com/FunnyVirus)
* [jereyes96](https://github.com/jereyes96)
* [AlephCadena](https://github.com/AlephCadena)
## Future Development
* Add reviews of the free game of the week
* Implement back-end server requests to parse game library. At the moment the information on the second page is pulled from a static URL as having each user download a 10MB json object seems impractical
* Add more interactivity to landing page such a gallery of gameplay images
* Add more interactivity on the second page such as user reviews and community chats 

