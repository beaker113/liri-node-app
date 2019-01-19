var env = require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios")
var fs = require('fs')
    // var spotify = require("node-spotify-api")
    ;

var term = process.argv[2];

var titles = [];

//consider making more efficient. reference cli.js
if (term === "spotify-this-song") {
    for (x = 3; x < process.argv.length; x++) {

        titles.push(process.argv[x]);
    }

    var songName = titles.join(" ");

    var keys = require("./keys")
    var spotify = new Spotify(keys.Spotify)

    if (!songName) {
        songName = "The Sign";
    };

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items.artists);
    });

   

}

if (term === "movie-this") {
    for (x = 3; x < process.argv.length; x++) {

        titles.push(process.argv[x]);
    }
    var movie = titles.join(" ");

    if (!movie) {
        movie = "Mr. Nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy")
        .then(function (response) {

            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        })
}

if (term === "do-what-it-says") {
    fs.readFile("random.txt", "UTF-8", function (err, text) {
        if (err) return console.log(err);
        var songName = JSON.stringify(text);

        var keys = require("./keys")
        var spotify = new Spotify(keys.Spotify)

        spotify.search({ type: 'track', query: songName }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data.tracks.items);
        });

    })
}



