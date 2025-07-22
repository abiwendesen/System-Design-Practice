import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import morgan from "morgan";
import client from "./redis.js";
const app = express();
//system design practice: insted of sending request from the frontend to the weather API we add a forward proxy server that will send request directly to the weather API
app.use(bodyParser.json())
app.use(morgan("common"))
dotenv.config();
await client.connect();
const port = process.env.PORT;

app.get("/weather",async (req,res)=>{
    let city = req.query.city;
    const apikey = process.env.API_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

 
     let response = await fetch(url);
     if(!response.ok){
        return res.status(400).json({message: `Weathre API error ${response.statusText}`})
     }
     let data = await response.json();
     let cached = await client.get(city);
     if(cached){
        console.log("from Redis");
        return res.status(200).json({
            
            info:JSON.parse(cached),
            source: "Redis"
        })
     }
     let weatherInfo = {
        name:data.name,
        temp_max:data.main.temp_max,
        temp_min:data.main.temp_min,
        weather:data.weather[0].description
     }
      
     await client.set(city, JSON.stringify(weatherInfo));
     await client.get(city)
     res.status(200).json({
       weatherInfo
     })


    

})

app.listen(port,()=>{
    console.log("Server Listening on port "+ port)
})


