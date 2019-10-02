function get(url){
    return fetch(url)
        .then(function(response){
           return response.json();
          })
        .then(function(data){
          return data;
          })
}

const inputForm = document.querySelector("#inputForm")
const formButton = inputForm.querySelector("#formButton")
const infoHolder = document.querySelector("#infoHolder")

// formButton.addEventListener("click", function(event){
//     event.preventDefault();
//     const cityName = cityForm.querySelector("#city").value;
//     printWeather(cityName);
// })

//Make category drop down - not in use yet, just to put to screen
function addIncidentCategoryDropDown(categoryArray){
  const categoryList = document.createElement("select");
  const selectWrapper = document.querySelector("#selectWrapper")
  
  categoryArray.forEach(function(item){
    const categoryOption = document.createElement("option")
    categoryOption.text = item;
    categoryOption.value = item;
    categoryList.append(categoryOption)
  })
  selectWrapper.append(categoryList)
}

//function to get different element for each incident
function getTitle(response){
  const title = document.createElement("h4")
  const titleInfo = response.features[i]['properties']['title']
  title.innerText = titleInfo
  title.setAttribute("class", "title")
  return title
}

function getDescription(response){
  const description = document.createElement("p")
  description.setAttribute("class", "description")
  
  const descriptionInfo = response.features[i]['properties']['description']
  description.innerHTML += descriptionInfo
  return description
  
}



function getCoords(response){
  const coords = response.features[i]['geometry']['coordinates']
  return coords
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

function getIncidentInfo(location, radius){ //may add incident type later
    
    get(`https://bikewise.org:443/api/v2/locations/markers?proximity=${location}&proximity_square=${radius}`)
        .then(function(response){
        //for loop to iterate through the items
          for (i = 0; i < response.features.length; i++) {
            //create div to hold info for each incident
            const incidentInfo = document.createElement("div")

            //create each element and add it to info div
            const title = getTitle(response)
            incidentInfo.append(title)
            const description = getDescription(response)
            incidentInfo.append(description)
      
            //add incident info div to page
            infoHolder.append(incidentInfo)
            createMarker(response)
            //call coords function - hopefull to use for mapping function
            coords = getCoords(response)
          }
          
        })
  
    }

const incidentCategories = ["crash", "hazard", "theft", "unconfirmed", "infrastructure_issue",   "chop_shop"]
getIncidentInfo("Atlanta", 10)










/************************************ Mulk's Code  ****************************************************************************************************/


//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// (function(){
    
// })()

// console.log(get("https://api.teleport.org/api/urban_areas/"))