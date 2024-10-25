const express=require("express");
const app=express();
app.use(express.json());

const route=require('./routes/routes');
app.use('/api/v1',route);

const cors=require('cors');
app.use(cors());



const dbConnect=require('./config.js/Database');
dbConnect();
app.get('/',(req,res)=>{
    res.send('<h1>this is home page</h1>');
})

app.listen(4000,()=>{
    console.log("App is running on the 4000port");
})