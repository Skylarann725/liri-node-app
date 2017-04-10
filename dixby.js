var twitter = require('twitter'); // access twitter package
var keys = (require('./keys.js')); // keys for twitter api

var fs = require('fs');

var operation = process.argv[2]; // global variables
var names = process.argv[3]; // global variables

function tweets() {

    var client = new twitter(keys.twitterKeys);

    var params = { screen_name: 'skylarann_725' }; // count: 5

    client.get('statuses/user_timeline', params, function(error, tweets) {

        if (error) {
            console.log(error);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                console.log(JSON.stringify(tweets[i].text));
                console.log("----------------------------")
            }
        }
    });
}

//function for getting the artists name from array
var getArtistNames = function(artist) {
    return artist.name;
};

var spotify = function(names) {

    var spotify = require('spotify'); // access spotify package - was not working globally

    console.log("song name = " + names);

    if (names === '') {
        console.log("You need a song Name!!!");
    } else {
        spotify.search({ type: 'track', query: names }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            songinfo = data.tracks.items;

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < songinfo[i].artists.length; j++) {
                    console.log(songinfo[i].artists[j].name);
                }
                console.log(songinfo[i].name);
                console.log(songinfo[i].preview_url);
                console.log(songinfo[i].album.name);
                console.log("---------------------")
            }
        });
    }
}

var switchOperation = function(operation, names) {
    switch (operation) { // switch statement to decide which operation
        case 'my-tweets':
            console.log();
            tweets();
            break;
        case 'spotify-this-song':
            console.log();
            spotify(names);
            break;
        case 'movie-this':
            console.log();
            movie(names);
            break;
        case 'do-what-it-says':
            console.log();
            doThis();
            break;
    }
};

switchOperation(operation, names);
