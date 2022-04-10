
// DONE more pics for weather conditions
// better font visiblity === better images
// github!!!
// DONE pics for day and night
// overall welldone!!
// DONE handle invalid city exception







const express = require("express");
const app = express();
const https = require("https");
// // const { dirname } = require("path");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

let weatherCondition = "";
let temparature = "Hi :)";
let location = "Earth";

let userUnit ="";

let weatherDesc1 = "Please enter a city, we're excited to serve you.";
let weatherDesc2 = "";
let imgCode = "";
let imgDisplay = "none";
let infoMidActive = "";

let dOrN = ""; // day or night  

// let tempID = "";
let tempUnit = "";

app.get("/", function (req, res) {



    res.render("index", {
        weatherID: weatherCondition + dOrN,
        infoTop: temparature,
        infoTempUnit: tempUnit,
        infoMid1: weatherDesc1,
        infoMid2: weatherDesc2,
        weatherImgDisp: imgDisplay,
        weatherImg: imgCode,
        infoBottom: location,
        infoMidActive: infoMidActive

    });
    
});




app.get("/aa", function (req, res) {
    let fullURL = "https://api.openweathermap.org/data/2.5/weather?q=a&units=imperial&appid=f3ee312f0887b223e918d2dbf3807f11";
    
    https.get(fullURL, function (response) {
        response.on("data", function (data) {
            const wData = JSON.parse(data);
            // const temp = wData.main.temp;
            //document.querySelector(".info-heading_mid").innerHTML = "temp is " + temp;
            res.send(wData);
        });
    });
});




app.post("/", function (req, res) {
    const city = req.body.cityName;
    const unit = req.body.unit;
    userUnit = unit;
    openWeather(city, unit, res);
});


app.listen(3000, function () {
    console.log("Server is running at 3000...");
});

// user defined functions 

function openWeather(city, unit, res) {
    const fullURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=f3ee312f0887b223e918d2dbf3807f11";
    https.get(fullURL, function (response) {
        response.on("data", function (data) {
            const wData = JSON.parse(data);

            if(wData.message === "city not found"){
                weatherDesc1 = "Sorry! City not found";
                weatherDesc2 = "Please try again :)";
            } else {
                temparature = wData.main.temp;
                location = wData.name + ", " + wData.sys.country;
                imgCode = wData.weather[0].icon;
                imgDisplay = "";
                weatherDesc1 = wData.weather[0].main;
                weatherDesc2 = wData.weather[0].description;
                infoMidActive = "info-heading_mid_active";
    
                idSetter(wData.weather[0].id);
                dOrNSetter(imgCode);
                unitSetter(userUnit);
                // console.log(wData);
                //document.querySelector(".info-heading_mid").innerHTML = "temp is " + temp;
            }
            res.redirect("/");
        });
    });
}


unitSetter = (unit) => {

    if(unit === "Imperial"){
        tempUnit = "°F"
    } else if(unit === "Metric"){
        tempUnit = "°C"
    } else if(unit === "SI"){
        tempUnit = "K"
    } else {
        tempUnit = "";
    }

}

idSetter = (tempID) => {
    if(tempID >= 200 && tempID<300){
        weatherCondition = "weather-200";
        
    } else if(tempID >= 300 && tempID<400){
        weatherCondition = "weather-300";
    } else if(tempID >= 500 && tempID<600){
        weatherCondition = "weather-500";
    } else if(tempID >= 600 && tempID<700){
        weatherCondition = "weather-600";
    } else if(tempID >= 700 && tempID<800){
        weatherCondition = "weather-700";
    } else if(tempID === 800){
        weatherCondition = "weather-800";
    } else if(tempID >= 800){
        weatherCondition = "weather-801";
    } else {
        weatherCondition = "";
    }
}

// to check whether to display day image or night
dOrNSetter = (imgCode) => {
    if(imgCode.includes("d")){
        dOrN = "d";
    } else if(imgCode.includes("n")){
        dOrN = "n";
    } else {
        dOrN = "";
    }
}