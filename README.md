# bikesmart
### An app to visualize local bike safety issues

![Screenshot of Project](https://maryella.dev/images/screenshot_bikesmart.png)

JavaScript | HTML | Google Map API

### The Premise
There are so many benefits to biking, no wonder more and more people are choosing it as their method of transportation. We hope to alert them to potential issues around their bike usage.



### The Tech
Using the [BikeWise API](https://bikewise.org/documentation/api_v2), we populate a Google Map using available geoJSON data, and then in the sidebar, provide additional information relevant to the reported issue, including images where available.
While the BikeWise API is an excellent API with lots of useful information, the description element in the returned JSON object is a big blob of HTML as a string. This presented a challenge to finesse the data to fit our site's formate. For example, I needed remove the img tag, extract its src, and re-use it appropriately so that our users can still see the provided image.

### Future Potential Improvements
As the first web project in a coding bootcamp, this app has a lot of room for improvement. I would probably begin by fixing the styling (and probably other) errors that occured when merging our code as newbies. 

Developed with Mulk Abdulul @mabdulul, Kobi West @kobiatl
