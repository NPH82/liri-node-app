
var twitter = require('twitter'),
	Spotify = require('spotify-web-api-node'),
	request = require('request'),
	keys = require('./keys.js');


//commands to understand:

//my-tweets
//**THIS WORKS**//
// var client = new twitter({
// 	"consumer_key": keys.twitterkeys.consumer_key,
// 	"consumer_secret": keys.twitterkeys.consumer_secret,
// 	"access_token_key": keys.twitterkeys.access_token_key,
// 	"access_token_secret": keys.twitterkeys.access_token_secret
// 	});

// var params = {screen_name: 'jsciptmills'};
// client.get('statuses/user_timeline', params, function(err, tweets, res) {
// 	if(!err) {
// 		for (var i = 0; i < tweets.length; i++) {
// 		console.log(tweets[i].text);
// 		console.log(tweets[i].created_at);
// 		}
// 	}
// });
//**^^THIS WORKS**//

//show last 2o tweets
//show when they were createds



//spotify-this-song


//show Artist

//show the song's name
//A preview link of the song from Spotify
//The album the song is from
//If no song shown, Default to "the Sign" Ace of Base



//movie-this
//**THIS WORKS**//
// var movie = process.argv[2];
// var apiKey = "40e9cece";
// var queryUrl ="http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie + "&y=&plot=short";

// console.log(queryUrl);

// request(queryUrl, function(error, response, body) {

// 	if (!error && response.statusCode === 200) {

// 		console.log(JSON.parse(body).Title);
// 		console.log(JSON.parse(body).Year);
// 		console.log(JSON.parse(body).imdbRating);
// 		console.log(JSON.parse(body).Ratings[1].Value);
// 		console.log(JSON.parse(body).Country);
// 		console.log(JSON.parse(body).Plot);
// 		console.log(JSON.parse(body).Actors);
// 	}
// });

//**^^^THIS WORKS^^^**//


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


//do-what-it-says
