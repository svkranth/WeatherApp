const express = require("express");
const https = require("https");
const app =express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended :true}));
app.use(express.static("public"));

app.get("/",function(req,resp){
    resp.sendFile(__dirname+"/index.html"); 
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.post("/success",function(req,res){
    res.redirect("/");
});

app.post("/",function(req,resp){
    var cityName = req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=4ce5ff01952fd082f2d9802f865f95ea&units=metric";
    https.get(url,function(weatherResponse){
            weatherResponse.on("data",function(data){
            var weatherData = JSON.parse(data);
            if(weatherResponse.statusCode === 200){
//                resp.write("<!DOCTYPE html><link rel="+"stylesheet"+" href="+"css/successstyle.css"+"><body>");
//                resp.write("<h1>Temperature in "+cityName+" is " + weatherData.main.temp + " degrees centigrade</h1>");
//                resp.write("<p>Feels like "+weatherData.main.feels_like+" degrees</p>");
//                resp.write("<p>Humidity is "+weatherData.main.humidity+"</p>");
//                resp.write("<p>"+weatherData.weather[0].description+"</p>");
//                resp.write("<img src="+"http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"+ " alt="+"Weather icon"+">");
//                resp.write("<form action="+"/success"+" method="+"POST"+">");
//                resp.write("<button class="+"check"+" type="+"submit"+">Check again</button></form></body>");
//                resp.send();
                resp.render("weather",{viewCityName : cityName, 
                                        viewTemp : weatherData.main.temp, 
                                        feelsLike : weatherData.main.feels_like,
                                        viewHumidity : weatherData.main.humidity,
                                        viewDescription : weatherData.weather[0].description,
                                        viewIcon : weatherData.weather[0].icon
                                    });  
            }else{
                resp.sendFile(__dirname+"/failure.html");
            }    
        });
    });   
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port: 3000");
});
