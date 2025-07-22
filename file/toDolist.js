import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs"

const app = express();
const port = 4000;
app.use(helmet())
app.use(morgan("common"))
 
app.use(bodyParser.json())

let todo = [
    {task:"walk", time:"3:00", priority:"top"},
    {task:"Talk", time:"4:00", priority:"med"},
    {task:"Code", time:"5:00",priority:"top"},
    {task:"Eat",time:"8:00",priority:"top"}
];

app.use((req,res,next)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Client IP: " + ip);
    next();
})

// app.post("/add", (req,res)=>{
//     if(req.body.task  === null && req.body.time===null && req.body.priority === null){
//         return res.status(409).json({message: "Task can not be empty"})
//     }
//     let check = todo.findIndex((ta)=>ta.task === req.body.task);
//      if(check >-1){
//         return res.status(409).json({message:"task already exist"})
//      }
 
//     let newTask = {
//         task: req.body.task,
//         time:req.body.time,
//         priority:req.body.priority
//     }
//     todo.push(newTask);
//     res.status(200).json({message:"Task added Successfuly", newTask});
// });



app.get("/show",(req,res)=>{
    res.status(200).json(todo);
});

app.delete("/delete/:task",(req,res)=>{
   
    let taskIndex = todo.findIndex((ta)=> ta.task === req.params.task);
   
    if(taskIndex>-1){
        todo.splice(taskIndex,1);
        res.status(200).json({message:"Deleted Successfuly ", todo})
    }
    else{
        return res.status(409).json({message:" Task does not exist"});
    }
})

//Deleting task 
// app.delete("/delete/:task",(req,res)=>{
//     let task = todo.findIndex((ta)=> ta.task === req.params.task)
//     if(task=== -1){
//         return res.status(409).json({message:"Task does not exist"})
//     }
//     todo.splice(task,1);
//     res.status(200).json({message:"Task deleted successfuly"})

// });



app.post("/add",(req,res)=>{
    if(req.body.task && req.body.priority && req.body.time === ""){
        return res.status(409).json({message:"fill the task and the time please"});
    }
    let newTask = {
        task: req.body.task,
        time:req.body.time,
        priority:req.body.priority
    };
    let checkIfTaskExists = todo.findIndex((ta)=> ta.task === req.body.task);
    if(checkIfTaskExists > -1){
        return res.status(409).json({message:"Task already exists"});
    }
    todo.push(newTask);
    res.status(200).json({message:"Task added ",newTask })
})

app.put("/update/:task",(req,res)=>{
 let taskInd = todo.findIndex((ta)=> ta.task === req.params.task)
 if(taskInd === -1){
    return res.status(409).json({message:"Task Does Not Exist"});
 }
  let newTask ={
    task: req.body.task,
    time: req.body.time,
    priority: req.body.priority
  }
  todo.push(newTask);
  res.status(200).json({message:"Task added", newTask});
});


app.listen(port,()=>{
    console.log("Running");
})

