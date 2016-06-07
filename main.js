/*  AJAX Exercise 03

- Refactor for user interaction.
	- getConsumerFinanceData button.onclick(API call)
 		- url (http://data.consumerfinance.gov/api/views.json)
	- Handle success/error responses
	- if request = done && successful (code 200) (console.log(results))

- getCustomData button.onclick(2nd API call)
	- Same as above
	- Make code D.R.Y.
		- function for httpRequest

- Implement templating (handlebars): Populate DOM with response obj
		-Use OMDB API
*/

'use strict';  // Strict mode checks for undeclared variables (etc.?)

(function() {  // Self invoking function
	/*document.getElementById('getDataButton').onclick = function(){// event listener/handler
		APIrequest('http://data.consumerfinance.gov/api/views.json'); // pass url to function
	}*/
	document.getElementById('getMovieData').onclick = function(){ // event listener/handler
		var $userInput = $('#movieSearch');
		if(!$userInput.val().trim()){  // check for valid input value
			alert('Please enter a movie title')
		}
		else{
			var omdb = 'http://www.omdbapi.com/?s=';
			var movieQuery = omdb + $userInput.val();

			APIrequest(movieQuery);
		}
		$userInput.val('');
	}
})();


function APIrequest(url){  // function to handle httpRequest
	var httpReq = new XMLHttpRequest();  // create httpRequest object
	httpReq.open('GET', url);  // innitialize request
	httpReq.send();  // send request

	httpReq.onreadystatechange = function(){ // event listener/handler for httpRequest
		var responseData;

		if(httpReq.readyState === httpReq.DONE){  // check: httpRequest done
			if(httpReq.status === 200){  // check: status OK (successful)
				responseData = httpReq.responseText; // get response
				console.log('http status: ' + httpReq.status);
				//console.log(responseData);
				passMovieData(responseData);  // pass response to function
			}
		}
	}
}


function passMovieData(data){  // pass movie data to html template
	var movieData = JSON.parse(data);
	var movieObj = movieData.Search;  // define obj holding array of movie objs
	console.log('array length: ' + movieObj.length);

	for(var i=0; i<movieObj.length; i++){  // iterate through JSON
		var templateSource = $('#movie-template').html();  // reference template
		var template = Handlebars.compile(templateSource);  // compile data obj
		var imdbLink = 'http://www.imdb.com/title/';
		
		var movie = {  // define data obj
			poster: movieObj[i].Poster,
			title: movieObj[i].Title,
			year: movieObj[i].Year,
			imdb: imdbLink + movieObj[i].imdbID
		};

		if(movieObj[i].Poster === 'N/A'){  // check for missing poster
			movie.poster = 'placeHolderImg.jpg';  // replace with placeholder img
		}

		var fullTemplate = template(movie);  // pass data obj to template
		$('body').append(fullTemplate);  // add compiled elements to DOM	
	}
}







