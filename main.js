function get(url){
    return fetch(url)
        .then(function(response){
           return response.json();
          })
        .then(function(data){
          return data;
          })
}

const citySelectorForm = document.querySelector("#citySelectorForm")


citySelectorForm.addEventListener("submit", function(event){
    event.preventDefault();
    const categoryValue = citySelectorForm.querySelector("select").value;
    updateCity(categoryValue);
})

function updateCity(cityName){
  const cityInfoDisplay = document.querySelector("cityInfo")
  const getCityName = cityName.toLowerCase()
  const cityInfo = get(`https://api.teleport.org/api/urban_areas/slug:${getCityName}/details/`)
    cityInfo.then(function(data){
      console.log(data.categories[1]["data"])
    })
}

/*** The  MaryEll Code */

function getCategories(){
    const categoryList = document.createElement("select");
    const selectWrapper = document.querySelector("#selectWrapper")
    get(`https://api.teleport.org/api/urban_areas/`)
        .then(function(response){
          for (i = 0; i < response._links['ua:item'].length; i++) {
            //  console.log(response._links['ua:item'][i].name)
              const categoryOption = document.createElement("option")
              categoryOption.text = response._links['ua:item'][i].name;
              categoryOption.value = response._links['ua:item'][i].name;
              categoryList.append(categoryOption)

            }
        })
    selectWrapper.append(categoryList)
    }


/************************************ Mulk's Code  ****************************************************************************************************/

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

function createMarker(response){
  let marker;
  coords = response.features[i]['geometry']['coordinates'];
  console.log(coords[0], coords[1])
  marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords[1], coords[0]),
      map: map
  });
  marker.setMap(map);
}

/************************************ Mulk's Code  ****************************************************************************************************/


//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
(function(){
    getCategories();
})()

// console.log(get("https://api.teleport.org/api/urban_areas/"))