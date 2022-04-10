const express = require("express");
const app = express();
const https = require("https");

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));


app.get("/weather", function(req, res){
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=rawalpindi&units=metric&appid=f3ee312f0887b223e918d2dbf3807f11";
    res.sendFile(__dirname + "/blah.html");
    
    // https.get(weatherURL, function(response){
    //     response.on("data", function(data){
    //         res.writeHead(200, { 'Content-Type':'text/html'});
    //         const weatherData = JSON.parse(data);
    //         const weatherIcon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
    //         res.write("TEmp is " + weatherData.main.temp);
    //         res.write("<img src=" + weatherIcon + ">");
            
    //         res.send();
    //     });
    // });

    
});

app.post("/", function(req, res){

    const userCity = req.body.userCity;
    const query = userCity;
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=f3ee312f0887b223e918d2dbf3807f11";

    https.get(weatherURL, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            res.send("The temparature of " + userCity + " is " + temp);
        });
})
});
// app.get('/style.css', function(req, res) {
//   res.sendFile(__dirname + "/" + "style.css");
// });


app.listen(3000, function(){
    console.log("Server is running at 3000...");
});


