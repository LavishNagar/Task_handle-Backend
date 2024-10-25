

const mongoose=require('mongoose');
require('dotenv').config();

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{console.log("DB connected Successfully")})
    .catch((error)=>{
        console.log("Db facing connection Issues");
        console.log(error);
        process.exit(1);
    })
}

module.exports=dbconnect;

