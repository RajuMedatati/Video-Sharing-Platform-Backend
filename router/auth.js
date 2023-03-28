const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth.js")
require("../db/conn.js");
const User=require("../model/users.js");
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("waw work krrha h ")
})

router.post("/register",async(req,res)=>{
    const {name,email,phone,profession,password,cpassword}=req.body

     if(!name || !email || !phone || !profession || !password || !cpassword){
        return res.status(422).json({error:"please filled the data properly"})
     }
     try{
         const userExist=await User.findOne({email:email})
         if(userExist){
            return res.status(422).json({error:"email already Exist"})
        }
        const newuser=new User({name,email,phone,profession,password,cpassword});

           

        await newuser.save()
        res.status(201).json({message:"user register succesfull"})

          }catch(err){
        res.send(err)

     }
   
})


router.post("/signin",async(req,res)=>{
    
    //  res.send(req.body)
    try{
        // console.log(req.body)
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"please filled the data"})
        }
        const userLogin= await User.findOne({email:email});

        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password)

               const token= await userLogin.generateAuthToken();

               res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
               });




                  if(isMatch){
                    
                    
                     res.status(200).send({data:token,userId:userLogin._id})
                   }else{
                      res.status(400).send("invalid password")
                   }
            
        }
       
        else{
            res.status(400).send("invalid email")
        }
       
     }catch(err){
        console.log(err)

    }
})


router.post("/logout",auth,async (req,res)=>{
    try{
   
        res.clearCookie("jwtoken");
        req.user.tokens=[];
        await req.user.save();
        res.status(200).send({msg:"logout succesfully",user:req.user});

        
        

    }catch(error){
        
        res.status(501).send({msg:"err in logout",error:error.message})
    }

})



module.exports=router;