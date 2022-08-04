
function GetInfo() {

    var newName = document.getElementById("search-input");

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=3d23d43e19e5b61c000de2cb3d6ef96b')
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day.  "Min: "  + "°"
    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = Number(data.list[i].main.temp_min - 273.15).toFixed(1);
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = Number(data.list[i].main.temp_max - 273.15).toFixed(2);
    }
    for(i = 0; i<7; i++){
        document.getElementById("humidity"+ (i+1)).innerHTML = Number(data.list[i].main.humidity).toFixed(2) ;
    }
    for(i = 0; i<7; i++){
        document.getElementById("speeds"+ (i+1)).innerHTML =Number(data.list[i].wind.speed).toFixed(2) ;
    }
    //------------------------------------------------------------

    // Getting Weather Icons
     for(i = 0; i<7; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    // console.log(data)

getCharts();

})

// .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }
    //------------------------------------------------------------

    let sbt = document.querySelector('#search-map')
    // let  mint1, mint2, mint3, mint4, mint5, mint6, mint7;
    sbt.addEventListener("click",()=>
    {
        let i;
        //  mint1 = Number(document.getElementById('day1Min').innerHTML);
        //  mint2 = Number(document.getElementById('day2Min').innerHTML);
        //  mint3 = Number(document.getElementById('day3Min').innerHTML);
        //  mint4 = Number(document.getElementById('day4Min').innerHTML);
        //  mint5 = Number(document.getElementById('day5Min').innerHTML);
        //  mint6 = Number(document.getElementById('day6Min').innerHTML);
        //  mint7 = Number(document.getElementById('day7Min').innerHTML);
        // console.log(mint1);
        // console.log(mint2);
        // console.log(mint3);
        // console.log(mint4);
        // console.log(mint5);
        // console.log(mint6);
        // console.log(mint7);
        getCharts();
    })
    function getCharts(){
    let myChart = document.getElementById('myChart').getContext('2d');
    //  details.maxtemp = mint1;
    let allWeather = [
      {day : 'tue',details:{maxtemp:Number(document.getElementById('day3Max').innerHTML),mintemp:Number(document.getElementById('day3Min').innerHTML),wspeed:Number(document.getElementById('speeds3').innerHTML),humidity:Number(document.getElementById('humidity3').innerHTML)}} ,
      {day : 'wed',details:{maxtemp:Number(document.getElementById('day4Max').innerHTML),mintemp:Number(document.getElementById('day4Min').innerHTML),wspeed:Number(document.getElementById('speeds4').innerHTML),humidity:Number(document.getElementById('humidity4').innerHTML)}} ,
      {day : 'thu',details:{maxtemp:Number(document.getElementById('day5Max').innerHTML),mintemp:Number(document.getElementById('day5Min').innerHTML),wspeed:Number(document.getElementById('speeds5').innerHTML),humidity:Number(document.getElementById('humidity5').innerHTML)}} ,
      {day : 'fri',details:{maxtemp:Number(document.getElementById('day6Max').innerHTML),mintemp:Number(document.getElementById('day6Min').innerHTML),wspeed:Number(document.getElementById('speeds6').innerHTML),humidity:Number(document.getElementById('humidity6').innerHTML)}} ,
      {day : 'sat',details:{maxtemp:Number(document.getElementById('day7Max').innerHTML),mintemp:Number(document.getElementById('day7Min').innerHTML),wspeed:Number(document.getElementById('speeds7').innerHTML),humidity:Number(document.getElementById('humidity7').innerHTML)}} ,
      {day : 'sun',details:{maxtemp:Number(document.getElementById('day1Max').innerHTML),mintemp:Number(document.getElementById('day1Min').innerHTML),wspeed:Number(document.getElementById('speeds1').innerHTML),humidity:Number(document.getElementById('humidity1').innerHTML)}} ,
      {day : 'mon',details:{maxtemp:Number(document.getElementById('day2Max').innerHTML),mintemp:Number(document.getElementById('day2Min').innerHTML),wspeed:Number(document.getElementById('speeds2').innerHTML),humidity:Number(document.getElementById('humidity2').innerHTML)}} 
    ];
    comparison();
     let data = {
        datasets: [{
                label: 'maximum temperature',
                data: allWeather,
                backgroundColor: 'rgba(255, 26, 104, 2)',
                borderColor: 'rgba(255, 26, 104, 2)',
                borderWidth: 1,
                tension:0.4,
                parsing:{
                  xAxisKey: 'day',
                  yAxisKey:'details.maxtemp'
                }
                },
        {
          label: 'minimum temperature',
          data: allWeather,
          backgroundColor: 'rgba(54, 162, 235, 2)',
          borderColor: 'rgba(54, 162, 235, 2)',
          borderWidth: 1,
          tension:0.4,
          parsing:{
            xAxisKey: 'day',
            yAxisKey:'details.mintemp'
          }
          },
          {
            label: 'wind speed',
            data: allWeather,
            backgroundColor: 'rgba(255, 206, 86, 2)',
            borderColor: 'rgba(255, 206, 86, 2)',
            borderWidth: 1,
            tension:0.4,
            parsing:{
              xAxisKey: 'day',
              yAxisKey:'details.wspeed'
            }
            },
            {
              label: 'humidity',
              data: allWeather,
              backgroundColor: 'rgba(75, 192, 192, 2)',
              borderColor: 'rgba(75, 192, 192, 2)',
              borderWidth: 1,
              tension:0.4,
              parsing:{
                xAxisKey: 'day',
                yAxisKey:'details.humidity'
              }
              }]
    };
    
    // config 
    let config = {
      type: 'bar',
      data,
      options: {
        maintainAspectRatio:false,
        legend:{
            position:'right'
        },
        scales: {
            x:{
                ticks :{
                    color : 'white'
                }
            },
          y: {
            beginAtZero: true,
            ticks:{
                color: 'white'
            }
          }
        }
      }
    };
    
    // render init block
     myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
     }
      function updateValue()
      {
       location.reload();
      }
      function comparison()
      {
        let mxm = document.getElementById("mx");
        let mim = document.getElementById("mt");
        let sp = document.getElementById("sx");
        let hp = document.getElementById("hdt");

        mint = [ Number(document.getElementById('day1Min').innerHTML),
        Number(document.getElementById('day2Min').innerHTML),
         Number(document.getElementById('day3Min').innerHTML),
         Number(document.getElementById('day4Min').innerHTML),
         Number(document.getElementById('day5Min').innerHTML),
         Number(document.getElementById('day6Min').innerHTML),
         Number(document.getElementById('day7Min').innerHTML)];
         mint.sort();
        //  console.log(mint);
         mxm.innerHTML = mint[mint.length - 1] + " c";
         mim.innerHTML = mint[0] +  " c";
         let spds = [
            Number(document.getElementById('speeds3').innerHTML),
            Number(document.getElementById('speeds4').innerHTML),
            Number(document.getElementById('speeds5').innerHTML),
            Number(document.getElementById('speeds6').innerHTML),
            Number(document.getElementById('speeds7').innerHTML),
            Number(document.getElementById('speeds1').innerHTML),
            Number(document.getElementById('speeds2').innerHTML)
         ];
         spds.sort();
        //  console.log(spds);

         sp.innerHTML = spds[spds.length - 1] + " m/s";

         let humi = [
            Number(document.getElementById('humidity1').innerHTML),
            Number(document.getElementById('humidity2').innerHTML),
            Number(document.getElementById('humidity3').innerHTML),
            Number(document.getElementById('humidity4').innerHTML),
            Number(document.getElementById('humidity5').innerHTML),
            Number(document.getElementById('humidity6').innerHTML),
            Number(document.getElementById('humidity7').innerHTML)
         ]
         humi.sort();
         console.log(humi);
         hp.innerHTML = humi[humi.length - 1] + "g/m3";



        





      }