
var map;

function createMarker(response){
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    let marker;
    coords = response.features[i]['geometry']['coordinates'];
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(coords[1], coords[0]),
        map: map,
        icon: 'img/flags.png'
    });
    marker.setMap(map);
    //<a name="linktotop">Back To Top</a>

     const infoText = response.features[i]['properties']['title']
     let popUpInfo = new google.maps.InfoWindow({
     content: infoText
     });
    marker.addListener('click', function() {
    popUpInfo.open(map, marker);
   })
  }

  
  
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //       initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //       map.setCenter(initialLocation);
  //   });
  // }

function updateMap(response){	
    let latlngbounds = new google.maps.LatLngBounds();	
    let coords = response.features[i]['geometry']['coordinates'];	
    position = new google.maps.LatLng(coords[1], coords[0])	
    latlngbounds.extend(position);	
    map.setCenter(latlngbounds.getCenter());	
    //map.fitBounds(latlngbounds);	
    }
  
  function initMap() {
    var myLatLng = {lat:  33.7490, lng:-84.3880 };
     map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: myLatLng,
    });
    let infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('Your location.');
        infoWindow.open(map);
        userMarker = new google.maps.Marker({	
                  position: new google.maps.LatLng(pos),	
                  map: map,	
                  icon: {path: google.maps.SymbolPath.CIRCLE,	
                  scale: 3}
                  })
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
  
  
