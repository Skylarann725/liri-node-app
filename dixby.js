var twitter = require('twitter');
var keys = new twitter(require('./keys.js'));
var operation = process.argv[2]; // global variables
var names = process.argv[3];

console.log(keys);


var tweets = function() {
    console.log(keys.twitterKeys);
    var keys = new twitter(keys.twitterKeys);
    
    var params = { screen_name: 'skylarann_725' };

    keys.get('statuses/user_timeline', params, function(error, tweets) {

        if (error) {
            throw error;
        }

        console.log(JSON.stringify(tweets, null, 2));

    });
}

var switchOperation = function(operation, value) {
    switch (operation) { // switch statement to decide which operation
        case 'my-tweets':
        console.log();
        tweets();
        break;
        case 'spotify-this-song':
        console.log();
        spotify(value);
        break;
        case 'movie-this':
        console.log();
        movie(value);
        break;
        case 'do-what-it-says':
        console.log();
        doThis();
        break;
    }
};

switchOperation(operation, names);


