const app = document.querySelector('#weather-app');

let forecast = {};
let weather = {};
let position = {};
let tempScale = getTempScale();
let mode = 'light';

function init(){

// Provjeri da li je lokacija snimljena
	getPosition().then(function(foundPosition){

		// postavi poziciju
		position = foundPosition;

		Promise.all([getWeather(foundPosition), getForecast(foundPosition)]).then(function(values) {

			//  postavi vrijeme i forecast
			weather = values[0];
			forecast = values[1];

			templateDash();
		}).catch(function(){
			templateNeedLocation();
		});

	}).catch(function(error){
		templateNeedLocation();
	});

}

templateWelcome();
init();
