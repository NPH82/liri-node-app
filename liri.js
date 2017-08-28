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
	fs.readFile("random.txt", "utf8", function (err, data) {
		if(err) {
			console.log(err);
		}
		console.log(data);
		var divideAndConquer = data.split(',');

		action = divideAndConquer[0];
		for(var i = 1; i < divideAndConquer.length; i++){
			if(i > 2 && i < divideAndConquer.length) {
			  inputValue = inputValue + '+' + divideAndConquer[i];
		} else {
			inputValue += divideAndConquer[i];
		}
		if(action === "spotify-this-song") {
		spot();
	} else if(action === "my-tweets") {
		tweet();
	} else if(action === "movie-this") {
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
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    });
};
//show last 2o tweets
//show when they were createds


//spotify-this-song
var spot = function() {
	checkInputValue();
    var spotify = new Spotify({
        id: keys.spotifykeys.id,
        secret: keys.spotifykeys.secret
    });

    spotify.search({ type: 'track,artist', query: inputValue, limit: 1}, function(err, data) {
        if (err) {
            console.log('Error occured: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);

    });
};
//show Artist
//show the song's name
//A preview link of the song from Spotify
//The album the song is from
//If no song shown, Default to "the Sign" Ace of Base



//movie-this
var movie = function() {
	checkInputValue();
    var apiKey = "40e9cece";
    var queryUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + inputValue + "&y=&plot=short";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        }
    });
};

var checkInputValue = function () {
	if(inputValue === '' && action === 'movie-this') {
		inputValue = 'Mr. Nobody';
	} else if(inputValue === '' && action === 'spotify-this-song'){
		inputValue = "Ace of Base";
	}
};
//show title
//year movie came out
//IMDB rating
//Rotten tomatoes Rating
//Country where movie was produced
//Language of Movie
//Plot of movie
//Actors
//if no movie typed in, default to "Mr. Nobody"
//API Key: 


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
}




