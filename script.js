var google = google;
var streetviewService;
var latitude = 10.3433083;
var longitude = 123.9204285;
var radius = 1;
var streetView = document.getElementById('view');
var button = document.getElementById('teleport');
var audio = new Audio('music.mp3');
var first = true;
var teleportLock = false;

function init() {
    streetviewService = new google.maps.StreetViewService;
    getRandomPlaceWithPanorama();
}

function getRandomPlaceWithPanorama() {
    var location = {
        location: { lat: latitude, lng: longitude },
        preference: google.maps.StreetViewPreference.BEST,
        radius: radius
    };
    streetviewService.getPanorama(
        location,
        function(result, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                createPanorama(result);
            } else {
                randomizeLatLong();
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
        streetView, data);
    if (!first) {
        audio.play();
    }
    teleportLock = false;
}

button.addEventListener('click', function() {
    if (teleportLock === false) {
        teleportLock = true;
        radius = 10000;
        randomizeLatLong();
        getRandomPlaceWithPanorama();
        first = false;
    }
});
