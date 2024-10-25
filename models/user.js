const mongoose=require('mongoose');
const Task=require('../models/task');


const userSchema=new mongoose.Schema({
username:{
    type:String
 

},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
    }]

})
module.exports=mongoose.model('User',userSchema);