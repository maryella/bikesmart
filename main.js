
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
const infoHolder = document.querySelector(".infoHolder")

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
  const linebar = document.createElement("hr")
  const titleInfo = response.features[i]['properties']['title']
  title.innerText = titleInfo
  title.append(linebar)
  title.setAttribute("class", "title")
  title.setAttribute("id", titleInfo);
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

getIncidentInfo(Atlanta, 10)











/************************************ Mulk's Code  ****************************************************************************************************/


//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// (function(){
    
// })()

