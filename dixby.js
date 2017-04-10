var twitter = require('twitter'); // access twitter package
var keys = (require('./keys.js')); // keys for twitter api
var request = require('request');
var fs = require('fs');

var operation = process.argv[2]; // global variables
var names = process.argv[3]; // global variables

var tweets = function() {

    var client = new twitter(keys.twitterKeys);

    var params = { screen_name: 'skylarann_725' }; // count: 5

    client.get('statuses/user_timeline', params, function(error, tweets) {

        if (error) {
            console.log(error);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                console.log(JSON.stringify(tweets[i].created_at + " " + tweets[i].text));
                console.log("----------------------------")
            }
        }
    });
}

var spotify = function(names) {

    var spotify = require('spotify'); // access spotify package - was not working globally

    if (names === undefined) {
        names = 'The Sign';

        console.log("Song Name: " + names);
        console.log('-----------------------')
    }

    spotify.search({ type: 'track', query: names }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        songinfo = data.tracks.items;

        for (var i = 0; i < 3; i++) {
            console.log('Song Name: ' + songinfo[i].name);
            for (var j = 0; j < songinfo[i].artists.length; j++) {
                console.log('Artist: ' + songinfo[i].artists[j].name);
            }
            console.log('Preview: ' + songinfo[i].preview_url);
            console.log('Album: ' + songinfo[i].album.name);
            console.log('-----------------------')
        }
    });
}

var movie = function(names) {

    if (names === undefined) {
        names = "Mr. Nobody";
    }

    request('http://www.omdbapi.com/?t=' + names + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
        if (names === '') {
            console.log('Please enter a movie name');
        }

        if (error) {
            console.log('Error occurred: ' + error);
            return;
        } else {
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMBD Rating: ' + JSON.parse(body).imdbRating);
            console.log('Country Produced: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
        }
    });
}

var doThis = function() {

    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
            throw err;
        }

        var dataArr = data.split(",");

        spotify(dataArr[1]);
    });
}

var switchOperation = function(operation, names) {
    switch (operation) { // switch statement to decide which operation
        case 'my-tweets':
            console.log('\n Fetching Tweets \n');
            tweets();
            break;
        case 'spotify-this-song':
            console.log('\n Fetching Song Info \n');
            spotify(names);
            break;
        case 'movie-this':
            console.log("\n Fetching Movie Info \n");
            movie(names);
            break;
        case 'do-what-it-says':
            console.log('\n Fetching Info \n');
            doThis();
            break;
    }
};

switchOperation(operation, names);
