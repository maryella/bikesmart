
var map;

function createMarker(response){
    let marker;
    coords = response.features[i]['geometry']['coordinates'];
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(coords[1], coords[0]),
        map: map,
        icon: 'img/bikego.svg'
    });
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    marker.setMap(map);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
    });
  }
  
  function initMap() {
    var myLatLng = {lat:  33.7490, lng:-84.3880 };
     map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatLng,
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  
  
