var google = google;
var latitude = -33.867386;
var longitude = 151.195767;

function init() {
    var streetviewService = new google.maps.StreetViewService;
    var location = { location: { lat: latitude, lng: longitude } };
    streetviewService.getPanorama(
        location,
        function(result, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                createPanorama(result);
            }
        });
}


function createPanorama(result) {
    var data = { pano: result.location.pano };
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('view'), data);
}
