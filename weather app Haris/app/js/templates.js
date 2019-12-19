let convertTimestamp = function (timestamp){
	return new Date( timestamp * 1000 );
}

let tempToF = function(temp){
	return Math.round( ((temp-273.15)*1.8)+32 );
}

let tempToC = function(temp){
	return Math.round( temp-273.15 );
}

let convertTemp = function(temp){
	if(tempScale == 'f'){
		return tempToF(temp);
	}else{
		return tempToC(temp);
	}
}

function templateDash(){

	let sunrise = convertTimestamp(weather.sys.sunrise);
	let sunset = convertTimestamp(weather.sys.sunset);
	let sun = `
		<section class="weather-sunrise">
			<div class="grd-row">
				<div class="grd-row-col-3-6 txt--left">
					<h6>
						<i class="wi wi-sunrise"></i>
						${ ((sunrise.getHours() + 11) % 12 + 1) }:${ sunrise.getMinutes() }
						<small>AM</small>

						&nbsp;

						<i class="wi wi-sunset"></i>
						${ ((sunset.getHours() + 11) % 12 + 1) }:${ sunset.getMinutes() }
						 <small>PM</small>
				  	</h6>
				</div>

				<div class="grd-row-col-3-6 txt--right py2">
					<img onclick="templateSettings()" class="wa-icon clickable" src="css/img/feather-settings.svg"/>
				</div>
			</div>
		</section>
	`;

	let hero = `
		<section class="weather-today">
		  	<h6 class="my0">Currently</h6>
			<h3 class="my0">${weather.name}</h3>
		  	<h1 class="my2">
		  		${convertTemp(weather.main.temp)}<sup><small>°</small></sup>
				<i class="wi wi-owm-${weather.weather[0].id}"></i>
			</h1>
			<div class="my2">
		  		<h6 class="my0">Today</h6>
		  		<h3 class="my0">

					<small><i class="wi wi-direction-up"></i></small>
					${convertTemp(weather.main.temp_max)}<sup><small>°</small></sup>

					<small><i class="wi wi-direction-down"></i></small>
					${convertTemp(weather.main.temp_min)}<sup><small>°</small></sup>
				</h3>
			</div>
	  </section>
	`;

	let forecastTable = `
		<section class="weather-forecast my2">
			<table>
				<tbody>
					${templateForecastList(forecast.days)}
				</tbody>
			</table>
		</section>
	`;

	app.innerHTML = `
		<div class="container txt--uppercase">
			${sun}
			${hero}
			${forecastTable}
		</div>
	`;
}


function templateForecastList(days){
	let list = ``;
	days.forEach(function(day) {
	    list += `
		    	<tr>
					<td>
						<h6 class="my0">${day.dayOfWeek}</h6>
					</td>
					<td>
						<i class="wi wi-owm-${day.icon}"></i>
					</td>
					<td>
						<i class="wi wi-direction-up"></i>
						${convertTemp(day.maxTemp)}<sup><small>°</small></sup>
					</td>
					<td>
						<i class="wi wi-direction-down"></i>
						${convertTemp(day.minTemp)}<sup><small>°</small></sup>
					</td>
				</tr>
				`;
	});
	return list;
}

function templateWelcome(){
	app.innerHTML = `
		<section class="full-page vertical-center txt--center">
			<div class="container">
				<h1>Dobro došli!</h1>
				<h6>Trenutno trazimo vasu lokaciju.</h6>
			</div>
		</section>
	`;
}
