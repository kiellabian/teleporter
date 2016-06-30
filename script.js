var google = google;
var streetviewService;
var latitude = 10.3433083;
var longitude = 123.9204285;

function init() {
    streetviewService = new google.maps.StreetViewService;
    getRandomPlaceWithPanorama();
}

function getRandomPlaceWithPanorama() {
    randomizeLatLong();
    var location = {
        location: { lat: latitude, lng: longitude },
        preference: google.maps.StreetViewPreference.BEST
    };
    streetviewService.getPanorama(
        location,
        function(result, status) {
            console.log(latitude, longitude, status);
            if (status === google.maps.StreetViewStatus.OK) {
                createPanorama(result);
            } else {
                getRandomPlaceWithPanorama();
            }
        });
}

function randomizeLatLong() {
    latitude = getRandomInRange(-90, 90);
    longitude = getRandomInRange(-180, 180);
}


function getRandomInRange(from, to) {
    return (from + Math.random() * (to - from)).toFixed(7) * 1;
}


function createPanorama(result) {
    var data = {
        pano: result.location.pano
    };
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('view'), data);
}
