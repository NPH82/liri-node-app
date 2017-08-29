var twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    request = require('request'),
    keys = require('./keys.js'),
    fs = require('fs');

//takes in actions and values
var action = process.argv[2];
var nodeArgs = process.argv;
var inputValue = '';

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        inputValue = inputValue + '+' + nodeArgs[i];
    } else {
        inputValue += nodeArgs[i];
    }
}

//do-what-it-says
var doIt = function() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        }
        var divideAndConquer = data.split(',');

        action = divideAndConquer[0];
        checkInputValue();
        for (var i = 1; i < divideAndConquer.length; i++) {
            if (i > 2 && i < divideAndConquer.length) {
                inputValue = inputValue + '+' + divideAndConquer[i];
            } else {
                inputValue += divideAndConquer[i];
            };

            if (action === "spotify-this-song") {
                spot();
            } else if (action === "my-tweets") {
                tweet();
            } else if (action === "movie-this") {
                movie();
            }

        }
    });
};

//my-tweets
var tweet = function() {
    var client = new twitter({
        "consumer_key": keys.twitterkeys.consumer_key,
        "consumer_secret": keys.twitterkeys.consumer_secret,
        "access_token_key": keys.twitterkeys.access_token_key,
        "access_token_secret": keys.twitterkeys.access_token_secret
    });

    var params = { screen_name: 'jsciptmills' };
    client.get('statuses/user_timeline', params, function(err, tweets, res) {
        if (!err) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("======================================================================");
                //show last 2o tweets
                console.log("Tweet: " + tweets[i].text);
                //show when they were createds
                console.log("Date created: " + tweets[i].created_at);
                console.log("======================================================================");
                addTextFile();
            }
        }
    });
};


//spotify-this-song
var spot = function() {
    checkInputValue();
    console.log(inputValue);
    var spotify = new Spotify({
        id: keys.spotifykeys.id,
        secret: keys.spotifykeys.secret
    });

    spotify.search({ type: 'track,artist', query: inputValue, limit: 1 }, function(err, data) {
        if (err) {
            console.log('Error occured: ' + err);
        }
        console.log("======================================================================");
        //show Artist
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        //show the song's name
        console.log("Song title: " + data.tracks.items[0].name);
        //A preview link of the song from Spotify
        console.log("Preview link: " + data.tracks.items[0].preview_url);
        //The album the song is from
        console.log("Album title: " + data.tracks.items[0].album.name);
        console.log("======================================================================");
        addTextFile();

    });
};

//movie-this
var movie = function() {
    checkInputValue();
    var apiKey = keys.imdbkeys.key;
    console.log(apiKey);
    console.log(inputValue);
    var queryUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + inputValue + "&y=&plot=short";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("======================================================================");
            //show title
            console.log("Movie title: " + JSON.parse(body).Title);
            //year movie came out
            console.log("Movie released in: " + JSON.parse(body).Year);
            //IMDB rating
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            //Rotten tomatoes Rating
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            //Country where movie was produced
            console.log("Movie was produced in: " + JSON.parse(body).Country);
            //Plot of movie
            console.log("Plot: " + JSON.parse(body).Plot);
            //Actors
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("======================================================================");
            addTextFile();
        }
    });
};

//Check to see if there is an input DEFAULT actions
var checkInputValue = function() {

    if (inputValue === '' && action === 'movie-this') {
        inputValue = 'Mr. Nobody';

    } else if (inputValue === '' && action === 'spotify-this-song') {
        inputValue = 'Ace of Base';

    }
};
//****BONUS appending to file
var addTextFile = function() {
    fs.appendFile('log.txt', action + "," + "'" + inputValue.replace(/\+/g, ' ') + "'" + "\n", function(err) {
        if (err) {
            console.log(err);
        }
    });
};

//commands to understand:

switch (action) {
    case 'my-tweets':
        tweet();
        break;

    case 'spotify-this-song':
        spot();
        break;

    case 'movie-this':
        movie();
        break;

    case 'do-what-it-says':
        doIt();
        break;
};