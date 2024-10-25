
const TASK=require('../models/task');
const User=require('../models/user');

exports.task=async (req,res)=>{
    try{
        const {title,desc}=req.body;
        const {id}=req.headers;

        //store in DB
        const Task=await TASK.create({
            title:title,
            desc:desc
        });
        // console.log('Task',Task);
        const taskId=Task.id;
        console.log("TaskId",taskId)

        // here we need user ID
        await User.findByIdAndUpdate(id,{$push:{tasks:taskId}},{new:true}).exec();
        console.log('User id',id);
        

        // const user = await User.findById(id);
        // if (!user) {
        // return res.status(404).json({ status: false, message: "User not found" });
        // }


        res.status(200).json({
            status:true,
            message:"task created",
        })

    }catch(error){
        console.log(error);
        console.log("Internal Server Error");
    }
}

exports.getAllTasks=async (req,res)=>{
    try{
        //get id of the user from header
        const {id}=req.headers;

        const userData=await User.findById(id);
        
        res.status(200).json({
            data:userData
        })
        
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            message:"Internal server error"
        });
        
    }
}