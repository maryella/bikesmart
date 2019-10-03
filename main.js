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

formButton.addEventListener("click", function(event){
    event.preventDefault();
    const inputLocation = inputForm.querySelector("#location").value;
    const inputRadius = inputForm.querySelector("#radius").value;
    const incidentType = inputForm.querySelector("select").value
    getIncidentInfo(inputLocation, inputRadius, incidentType);
})

//Make category drop down
function addIncidentCategoryDropDown(categoryArray){
  const categoryList = document.createElement("select");
  const selectWrapper = document.querySelector("#selectWrapper")
  categoryArray.forEach(function(item){
    const categoryOption = document.createElement("option")
    categoryOption.text = item;
    if (item == "all"){
      categoryOption.value = "";
    }
    else {
      categoryOption.value = `incident_type=${item}`;
    }
    
    categoryList.append(categoryOption)
  })
  selectWrapper.append(categoryList)
}
const incidentCategories = ["all", "crash", "hazard", "theft", "unconfirmed", "infrastructure_issue",   "chop_shop"]
addIncidentCategoryDropDown(incidentCategories)

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
  let descriptionInfo = response.features[i]['properties']['description']
  //remove image from text
  descriptionInfo = descriptionInfo.replace(/<img .*?>/g,"")
  //remove links
  descriptionInfo = descriptionInfo.replace(/<a [^>]+>[^<]*<\/a>/, '');
  //push words only into description element
  description.innerHTML += descriptionInfo;
  return description
}

function getImage(response){
  const description = document.createElement("div")
  let descriptionInfo = response.features[i]['properties']['description']
  description.innerHTML += descriptionInfo;
  var imgTag = description.querySelector('img');
  if (imgTag != null){
    const sourceURL = imgTag.getAttribute('src');
    const photo = document.createElement("img")
    photo.setAttribute("class","photo")
    photo.src = sourceURL
    return photo
    }
}
  
//Do we want to add a function to add link back in?

//not needed after all
// function getCoords(response){
//   const coords = response.features[i]['geometry']['coordinates']
//   return coords
// }


markers = []
function createMarker(response){
  let marker;
  coords = response.features[i]['geometry']['coordinates'];
  marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords[1], coords[0]),
      map: map
  });
  marker.setMap(map);
  markers.push(marker)

  const infoText = response.features[i]['properties']['title']
  let popUpInfo = new google.maps.InfoWindow({
      content: infoText.substr(0, 15) + "..."
      });
  marker.addListener('click', function() {
    popUpInfo.open(map, marker);
    })
  
}

// function updateMap(marker){
//   let latlngbounds = new google.maps.LatLngBounds();
//   latlngbounds.extend(marker.position);
//   map.setCenter(latlngbounds.getCenter());
//   //map.fitBounds(latlngbounds);
// }

function updateMap(response){
  let latlngbounds = new google.maps.LatLngBounds();
  let coords = response.features[i]['geometry']['coordinates'];
  position = new google.maps.LatLng(coords[1], coords[0])
  latlngbounds.extend(position);
  map.setCenter(latlngbounds.getCenter());
  //map.fitBounds(latlngbounds);
}



// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//       initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//       map.setCenter(initialLocation);
//   });
// }

function initMap() {
  let myLatLng = {lat:  33.7490, lng:-84.3880 };
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
      infoWindow.setContent('Your location');
      infoWindow.open(map);
      //remove location found infobox, adding position marker
      userMarker = new google.maps.Marker({
        position: new google.maps.LatLng(pos),
        map: map,
        icon: {path: google.maps.SymbolPath.CIRCLE,
          scale: 3}
    });
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


function getIncidentInfo(location, radius, type){ 
    infoHolder.innerHTML = ""
    get(`https://bikewise.org:443/api/v2/locations/markers?${type}&proximity=${location}&proximity_square=${radius}&all=false`)
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
            const image = getImage(response)
              if (image != undefined) {
                incidentInfo.append(image)
              }
            
            //add incident info div to page
            infoHolder.append(incidentInfo)
            //add marker to map
            createMarker(response)
            //recenter map
            updateMap(response)          
          }
        })
  
    }













/************************************ Mulk's Code  ****************************************************************************************************/


//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// (function(){
    
// })()

// console.log(get("https://api.teleport.org/api/urban_areas/"))