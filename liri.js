require("dotenv").config();

var keys = require("./keys.js");
console.log(keys)
var fs = require("fs");

var instruction = process.argv[2];
var input = process.argv[3];//process.argv.slice(3).join(" ")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
if (instruction === "spotify-this-song") {
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("-------------------------------------");
        console.log("Artists name: " + data.tracks.items[0].artists[0].name);
        console.log("Name: " + data.tracks.items[0].name);
        console.log("Url: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("-------------------------------------");
    });
} else if (instruction === "movie-this") {
    var axios = require("axios");
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {

            console.log("-------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Value: " + response.data.Ratings[1].Value);
            console.log("Plot: " + response.data.Plot);
            console.log("Language: " + response.data.Language);
            console.log("Actors: " + response.data.Actors);
            console.log("Country: " + response.data.Country)
            console.log("-------------------------------------");


        });

} else if (instruction === "concert-this") {
    var axios = require("axios");

    var artist = process.argv.slice(3).join(" ")
     var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    console.log(artist);
    axios.get(queryUrl).then(
        function (response) {

            for (var i = 0; i < 5; i++) {

                console.log("-------------------------------------");
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.city);
                console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("-------------------------------------");
            }


        });


}



//===============================================================================================//
