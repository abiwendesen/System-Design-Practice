import express from 'express'
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express()
const port = 3000;
app.use(bodyParser.json());

app.use(helmet());
//83934efa28ea4eabaa4201626251307

var users = [
    {id:1, name:"abi", age:27},
    {id:2, name:"Jhon Doe", age:29}
]

app.get("/users", (req,res)=>{

res.status(200).json(users);


})

app.post("/register", (req,res)=>{

    if(users.some((user) => user.name === req.body.name))
      {  
        return res.status(409).json(`${req.body.name}  already exists`) 
      }
      
  let newUser = 
    {
        id:users.length +1,
        name: req.body.name,
        age: req.body.age
    };

   users.push(newUser);
   res.status(201).json(users)
});

app.get("/users/:id",(req,res)=>{
    let user = users.find((u)=> u.id === parseInt(req.params.id));
    if(!user){
        return res.status(409).json({message:"User Not Found"});
    }

     return res.status(200).json(user);
    
});

app.put("/users/update/:id",(req,res)=>{
    let user = users.find((u)=> u.id === parseInt(req.params.id))
    if(!user){
        return res.status(409).json({message:"User Does not exist"})
    }

    user.name = req.body.name;
    user.age = req.body.age;

    res.status(200).json(user)
    
});
app.delete("/users/delete/:id",(req,res)=>{
    let user = users.find((u) => u.id === parseInt(req.params.id))
    if(!user){
        return res.status(409).json({message:"User Does not exist"});
    }

    users.splice(user,1);
    res.status(200).json({message:"User Deleted Succssfully"});

});

app.listen(port,()=>{
    console.log("Server is Running");
})