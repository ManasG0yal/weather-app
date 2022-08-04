'use strict'

let vids = document.getElementById("myVideo");
// let srcss = document.getElementsByTagName('source');
let fle = document.getElementsByClassName('weathers');
let loc =document.getElementById("location");
let tempvalue=document.getElementById("temp-value");
let climate =document.getElementById("climate");
let spp =document.getElementById("spd");
let hmdy = document.getElementById("hmdy");
let selec = document.getElementsByTagName('span');
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click', (e)=>
{
//     let date = document.querySelector('.date');
// let today = new Date();

// let dates = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// date.textContent = dates;

// let time = document.querySelector('.time');
// let todays = new Date();

// let times = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// time.textContent = times;

e.preventDefault();
getWeather(searchInput.value);
searchInput.value='';


});



const getWeather=async (city)=>
{
    try{

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab3af44de7d24ae7ff86549334e45bd`,
   
            {mode: 'cors'}
        );

        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        const{speed}=weatherData.wind;
        const{humidity}=weatherData.main;
        loc.textContent=name;
        climate.textContent=main;
        spp.textContent=speed;
        hmdy.textContent=humidity;
        tempvalue.textContent=Math.round(feels_like-273);
        console.log(id);
        // sel.style.color = "orange";
        if(id>=200 && id<300)
        {
            vids.src = "heavy-rain.mp4"
        }
       else if(id>=300 && id<500)
        {
            vids.src = "thunder.mp4"
        }
        else if(id>=500 && id<600)
        {
            vids.src = "heavy-rain.mp4"
            loc.style.color = "white";

        }
        else if(id>=600 && id<700)
        {
            vids.src = "cold.mp4"
            loc.style.color = "black";
        }
        else if(id>=700 && id<800)
        {
            vids.src = "sunny.mp4"
        }
        else if(id>=800)
        {
            vids.src = "mist.mp4"
            loc.style.color =  "rgb(231, 231, 231)"

        }

        

    }
catch(error)
{
    alert('city not found');
}
};











