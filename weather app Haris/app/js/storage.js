
/* Spremanje */
function storageAvailable(type) {
    try {
        let storage = window[type], x = '__storage_test__';
        	storage.setItem(x, x);
			storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (

            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&

            storage.length !== 0;
    }
}

const isStorageAvailable = storageAvailable('localStorage');

function localSave(keyy,value){
	if(isStorageAvailable){
		localStorage.setItem(keyy, value);
	}
}

function localGet(keyy){
	if(isStorageAvailable){
		return localStorage.getItem(keyy);
	}
}

function localRemove(keyy){
	if(isStorageAvailable){
		localStorage.removeItem(keyy);
	}
}
