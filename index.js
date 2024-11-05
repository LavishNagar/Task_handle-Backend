const express=require("express");
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization,id', // Allow the Content-Type header
  }));

const route=require('./routes/routes');
app.use('/api/v1',route);

// app.use(cors());


const dbConnect=require('./config.js/Database');
dbConnect();
app.get('/',(req,res)=>{
    res.send('<h1>this is home page</h1>');
})

app.listen(4000,()=>{
    console.log("App is running on the 4000port");
})