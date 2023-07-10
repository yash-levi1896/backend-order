const express=require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../Models/user.model');
const UserRoute=express.Router();


UserRoute.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body
    let oneuser=await UserModel.find({email});
    if(oneuser.length===0){
        try {
            bcrypt.hash(password, 10, async(err, hash)=> {
                // Store hash in your password DB.
                if(err)
                throw err;
                else{
                    user=await UserModel({name,email,password:hash,address})
                    user.save();
                    res.status(200).send({msg:"user registered"})
                }
                
            }); 
        } catch (error) {
            res.status(400).send({msg:"some error occured can't registered the user"})

            console.log(error.message)
        }
    }else{
        res.status(200).send({msg:"user already registered please login!"})
    }
    
})

UserRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.find({email});
    if(user.length===0){
        res.status(404).send({msg:"user not found please registered first!"})
    }else{
        try {
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(err){
                    res.status(400).send({msg:"Wrong credentials!"})
                }

                else if(result===true){
                   let token=jwt.sign({ "userID": user[0]._id }, 'gupta');
                   res.status(200).send({msg:"login successfull !",token});
                }else{
                    res.status(400).send({msg:"Wrong credentials!"})
                }
            });
        } catch (error) {
            res.status(400).send({msg:"error in login"})
        }
    }
});

UserRoute.patch("/user/:id/reset",async(req,res)=>{
      const {password,newpassword}=req.body;
      const {id}=req.params
      user=await UserModel.find({_id:id});
      bcrypt.compare(password, user[0].password, function(err, result) {
        // result == true
        if(err){
            res.status(400).send({msg:"password enterd is not right!"})
        }

        else if(result===true){
            bcrypt.hash(newpassword, 10, async(err, hash)=> {
                // Store hash in your password DB.
                if(err)
                throw err;
                else{
                    await UserModel.findByIdAndUpdate({_id:id},{password:hash})
                    //userp.save();
                    res.status(204).send({msg:"user password reset !"})
                }
                
            }); 
        }else{
            res.status(400).send({msg:"password enterd is not right!"})
        }
    });
})

     
         
      

module.exports={UserRoute}