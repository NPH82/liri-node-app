
var twitter = require('twitter'),
	spotify = require('spotify'),
	request = require('request'),
	keys = require('./keys.js');

//commands to understand:

//my-tweets

// var client = new twitter({
// 	"consumer_key": keys.twitterkeys.consumer_key,
// 	"consumer_secret": keys.twitterkeys.consumer_secret,
// 	"access_token_key": keys.twitterkeys.access_token_key,
// 	"access_token_secret": keys.twitterkeys.access_token_secret
// 	});

// request('https://api.twitter.com/1.1/search/tweets.json', function(error, response, body) {


// 	if (error) {
// 	console.log("hello")
// 	console.log(response.statusCode)
// 	console.log(response);
// 	console.log(body);
// 	}
//  });


//show last 2o tweets
//show when they were createds



//spotify-this-song
//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

var searchSpotify = process.argv[2];
// var queryUrl = "http://api.spotify.com/v1/search?q=" + searchSpotify + "&type=track,album,artist&limit=10&access_token=BQC69iUx57uKqyDC72OnWba9xBgA0n2QU--7omYXuhGgpRqAMSEH-3SFjLvhZhbG7ywZ_sq14JNgcRo5p5PadEQwdtVxaQ2NbFIEOM4mjWOURwFeD8DBMdkRFgSv6F6JbD_p3yxqVxI";

var client_id = keys.spotifykeys.id; 
var client_secret = keys.spotifykeys.secret; 



// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
  		console.log(response.statusCode);
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    spotify.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

// spotify.search({type: 'artist, album, track', query: searchSpotify }, function(err, data){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(data);
// 	}
// });

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
