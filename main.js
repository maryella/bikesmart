
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