
/*  Uzima lokaciju iz browsera   */
let browserLocation = function () {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
}

function getBrowserLocation(){
	let promise = browserLocation().then(function(position){
	    if (position.coords) {
		    localSave('latitude', position.coords.latitude );
		    localSave('longitude', position.coords.longitude );
		    return {
			    latitude: position.coords.latitude,
			    longitude: position.coords.longitude
		    };
	    } else {
	      reject();
	    }
	});
	return promise;
}


function getCountry(){
	return localGet('country');
}

function getGeoPosition(){
	let latitude = localGet('latitude');
	let longitude = localGet('longitude');
	if(latitude && longitude){
		return {
		    latitude: latitude,
		    longitude: longitude
	    }
	}else{
		return false;
	}
}

function getCachedPosition(){

	let country = getCountry();
	let position = getGeoPosition();

}

function getPosition(){

	let cachedPosition = getCachedPosition();
	if(cachedPosition){
		return new Promise(
	    	resolve => resolve(cachedPosition)
	    );
	}else{
		return getBrowserLocation();
	}

}
