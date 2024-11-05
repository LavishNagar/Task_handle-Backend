const User=require('../models/user');
let jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

require("dotenv").config();


exports.signup=async (req,res)=>{
    try{
        //fetch data from the req.body
        const {username,email,password}=req.body;
        // console.log(req.body);
        //check user already exist or not
        const existingUser = await User.findOne({ email });
        // console.log("existingUser:",existingUser);

        if(existingUser){
          return res.status(401).json({
                success:false,
                message:"user is already (email) exists"
            })
        }


        //do hashing of the password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,5);
            // console.log("hashedpassword",hashedPassword);
        }catch{
            return res.status(402).json({
                status:false,
                message:"error to hashing the password"
            })
        }


        //create user entry in DB

        const USER=User.create({
            username:username,
            password:hashedPassword,
            email
        
        
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
          });

    }catch(error){
        console.log(error);
        console.log("Error in SIgnup")
    }
}

exports.login=async (req,res)=>{
    try{
        //fetch data from req body

        const {password,username}=req.body;

        //user enter data in the input boxes or not
        if(!password || !username){
            return res.status(401).json({
                success:false,
                message:"Fields are not entered, please enter all the fields carefully",
            })
        }
        //now search that user is present in the DB or not 

        let user= await User.findOne({username});

        if(!user){
            return res.status(200).json({
                status:false,
                message:"failed to Login",
            })
        }
        // console.log(user.password);
        // console.log(password);
        // console.log(await bcrypt.compare(password,user.password))

        if(await bcrypt.compare(password,user.password)){
            const payload = { id: user.id }; // Include any payload you need
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            return res.status(200).json({
                status:true,
                id:user.id,
                token:token,
                message:"User Logged in successfuly",
            })
        }
        else{
            return res.status(400).json({
                status:false,
                message:"enter password correctly!"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure!"
          })
    }
}