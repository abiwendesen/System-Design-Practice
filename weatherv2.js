import dotenv from 'dotenv';
import express from "express";
import bodyParser from 'body-parser';
import helmet from 'helmet';
import fetch from 'node-fetch';

const app = express();

app.use(bodyParser.json());
dotenv.config();
app.use(helmet());

const port = process.env.PORT;

app.get("/weather",async (req,res)=>{

    let apikey = process.env.API_KEY;
   // const lat = 33.44
    let city = req.query.city;
   // const lon = -94.04
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
   try{
    let response = await fetch(url);
    if(!response.ok){
        return res.status(400).json({error: `Weather API error: ${response.statusText}`})
    }
    let data =  await response.json();
    res.status(200).json({
    //  location :{lat: data.lat, lon: data.lon},
     data
    })}
    catch(error){
        res.status(400).json({message: "errora"});
    }
})
app.listen(port, ()=>{
    console.log("server started and started listening ")
})