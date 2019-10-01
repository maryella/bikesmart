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
  description.innerHTML = descriptionInfo

  
}

function getCoords(response){
  const coords = response.features[i]['geometry']['coordinates']
  console.log(coords)
}


function getIncidentInfo(location, radius){ //may add incident type later
    
    get(`https://bikewise.org:443/api/v2/locations/markers?proximity=${location}&proximity_square=${radius}`)
        .then(function(response){
        //     console.log(response.features['0'])
          for (i = 0; i < response.features.length; i++) {
            const incidentInfo = document.createElement("div")
            const title = getTitle(response)
            incidentInfo.append(title)
            const description = getDescription(response)
            incidentInfo.append(description)
      
            infoHolder.append(incidentInfo)
            getCoords(response)
          }
          
        })
  
    }

const incidentCategories = ["crash", "hazard", "theft", "unconfirmed", "infrastructure_issue",   "chop_shop"]
getIncidentInfo("Atlanta", 10)

addIncidentCategoryDropDown(incidentCategories)
//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// (function(){
    
// })()

// console.log(get("https://api.teleport.org/api/urban_areas/"))