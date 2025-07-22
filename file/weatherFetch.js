import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const app  = express();
 dotenv.config()


app.use(bodyParser.json());
let port =process.env.PORT

app.get("/weather",async(req,res)=>{
   let city = "Addis Ababa"
   let apiKey = process.env.API_KEY;
   console.log(apiKey)
   let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
  try{
    let response = await fetch(url); 
      if (!response.ok) {
    return res.status(response.status).json({ error: `Weather API error: ${response.statusText}` });
  }
    let data = await response.json();
    
    res.status(200).json({
     city: data.location.name,
      country: data.location.country,
      temperature_c: data.current.temp_c,
      condition: data.current.condition.text,
    })
  }catch(error){
    console.log(error)
    res.status(404).json({"message":"here"})
  }
});



app.listen(port,()=>{
    console.log("message"+`Listening on ${process.env.PORT}`)
    console.log(port)
})
