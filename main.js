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
    const cityName = cityForm.querySelector("#city").value;
    printWeather(cityName);
})

//Make category drop down - not in use yet
// function addIncidentCategoryDropDown(categoryArray){
//   const categoryList = document.createElement("select");
//   const selectWrapper = document.querySelector("#selectWrapper")
  
//   categoryArray.forEach(function(item){
//     const categoryOption = document.createElement("option")
//     categoryOption.text = item;
//     categoryOption.value = item;
//     categoryList.append(categoryOption)
//   })
//   selectWrapper.append(categoryList)
// }

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
            const image = getImage(response)
              if (image != undefined) {
                incidentInfo.append(image)
              }
            
            //add incident info div to page
            infoHolder.append(incidentInfo)

            //call coords function - hopefull to use for mapping function
            const coords = getCoords(response)
            const lon = coords[0]
            const lat = coords[1]
          
            
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