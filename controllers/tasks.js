
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

        const userData=await User.findById(id).populate({
            path:"tasks",
            options:{sort:{createdAt:-1}}
        });
        
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

//delete Tasks

exports.deleteTask=async (req,res)=>{
    try{
        const {id}=req.params;
        console.log("Taksid",id);
        await TASK.findByIdAndDelete(id);
        console.log("I am Inside delete taks")
        const userId=req.headers.id;
        console.log("userid",userId);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});

        res.status(200).json({
            message:"task deleted successfully"
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            message:"Internal Server Error in Deletion"
        })

    }
}

exports.updateTask=async (req,res)=>{
    try{
        const {id}=req.params;
        const {title,desc}=req.body;
        await TASK.findByIdAndUpdate(id,{title:title,desc:desc});
  

        res.status(200).json({
            message:"Task updated successfully"
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            message:"Task is unable to update successfully"
        })

    }}

 exports.updateCompleteTask=async (req,res)=>{
        try{
            const {id}=req.params;
            console.log(id);
            const TaskData=await TASK.findById(id);
            const completeTask=TaskData.complete;
            console.log("completeTask",completeTask);
            await TASK.findByIdAndUpdate(id,{complete:!completeTask})
      
    
            res.status(200).json({
                message:"complete updated successfully"
            })
    
        }
        catch(error){
            console.log(error);
            res.status(400).json({
                message:"Internal Server Error to mark complete task"
            })
    
        }}

 exports.updateImportantTask=async (req,res)=>{
            try{
                const {id}=req.params;
                console.log(id);
                const TaskData=await TASK.findById(id);
                const importantTask=TaskData.important;
                console.log("importantTask",importantTask);
                await TASK.findByIdAndUpdate(id,{important:!importantTask})
          
        
                res.status(200).json({
                    message:"important updated successfully"
                })
        
            }
            catch(error){
                console.log(error);
                res.status(400).json({
                    message:"Internal Server Error to mark complete task"
                })
        
            }}
    

exports.getImpTasks=async (req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({
            path:"tasks",
            match:{important:true},
            options:{sort:{createdAt:-1}},

        })
        const impTaskData=Data.tasks;
        res.status(200).json({
            data:impTaskData
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Internal server error",
        })
    }
}

exports.getCmpTasks=async (req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({
            path:"tasks",
            match:{complete:true},
            options:{sort:{createdAt:-1}},

        })
        const cmpTaskData=Data.tasks;
        res.status(200).json({
            data:cmpTaskData
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Internal server error",
        })
    }
}