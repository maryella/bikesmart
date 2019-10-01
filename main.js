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


//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
(function(){
    getCategories();
})()

// console.log(get("https://api.teleport.org/api/urban_areas/"))