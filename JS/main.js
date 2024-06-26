
let weatherLocation = document.querySelector(".location");
let todayDay = document.querySelector(".today-day");
let todayDate = document.querySelector(".today-date");

let todayDegree = document.querySelector(".today-degree");
let todayIcon = document.querySelector(".today-icon");
let todayDescription = document.querySelector(".today-description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let compass = document.querySelector("#compass");
let nextDay = document.querySelectorAll(".nextDay");
let nextDayIcon= document.querySelectorAll(".nextDay-icon");
let maxDegree = document.querySelectorAll(".max-degree");
let minDegree = document.querySelectorAll(".min-degree");
let nextDayDescription =document.querySelectorAll(".nextDay-description");
let searchBar = document.querySelector(".search")
let currentCity;
var allData=[];
var para;
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
async function getweather (para) {
    var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=efd294d9dac54cd1852103322242406&q=${para}&days=3`);
  allData= await res.json();
    console.log(allData);
    display();
    displayNextDay();
};

getweather("tanta");

function display() {
    var date = new Date();
    todayDay.innerHTML=days[date.getDay()];
    todayDate.innerHTML=`${date.getDate()} ${months[date.getMonth()]}`;
    weatherLocation.innerHTML = allData.location.name;
    todayDegree.innerHTML = allData.current.temp_c + `<sup>o</sup>
                                        c`;
    todayDescription.innerHTML=allData.current.condition.text;
    todayIcon.setAttribute("src",`https:${allData.current.condition.icon}`)
    humidity.innerHTML=`<img  src="./IMAGES/icon-umberella.png" class="pe-2" alt="">` +  allData.current.humidity;
    wind.innerHTML= `<img src="./IMAGES/icon-wind.png" class="pe-2" alt="">` +  allData.current.wind_mph;
    compass.innerHTML= `<img src="./IMAGES/icon-compass.png" class="pe-2" alt="">` + allData.current.wind_dir;
}   

function displayNextDay() {
    for (let i = 0; i < nextDay.length; i++) {
       nextDay[i].innerHTML=days[new Date(allData.forecast.forecastday[i+1].date).getDay()];
       nextDayIcon[i].setAttribute("src",`https:${allData.forecast.forecastday[i+1].day.condition.icon}`);
       maxDegree[i].innerHTML=allData.forecast.forecastday[i+1].day.maxtemp_c + `<sup>o</sup>
                                        c`;
       minDegree[i].innerHTML=allData.forecast.forecastday[i+1].day.mintemp_c + `<sup>o</sup>
                                        c`;
       nextDayDescription[i].innerHTML=allData.forecast.forecastday[i+1].day.condition.text;

        
    }
    
}

searchBar.addEventListener("keyup",function () {

   currentCity=searchBar.value;

    getweather(currentCity);
})