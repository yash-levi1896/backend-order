const express=require('express');
const { ResturantModel } = require('../Models/resturant.model');
const ResturantRoute=express.Router();


ResturantRoute.get("/restaurants",async(req,res)=>{
     const data=await ResturantModel.find();
     res.status(201).send({msg:data})
})

ResturantRoute.get("/restaurants/:id",async(req,res)=>{
    const data=await ResturantModel.find({_id:req.params.id});
    res.status(201).send(data)
})
ResturantRoute.get("/restaurants/:id/menu",async(req,res)=>{
    const data=await ResturantModel.find({_id:req.params.id});
    res.status(201).send(data[0].menu)
})
ResturantRoute.put("/restaurants/:id/menu",async(req,res)=>{
    const {name,address,menu}=req.body
    await ResturantModel.findByIdAndUpdate({_id:req.params.id},{name,address,menu},{
        new: true,
        upsert: true
    });
    res.status(201).send({msg:"menu updated!"})
})
ResturantRoute.delete("/restaurants/:id/menu/:mid",async(req,res)=>{
    const {id,mid}=req.params
    await ResturantModel.updateOne({_id:id},{$pull: {menu: {_id: mid}}});
    res.status(201).send({msg:"menu item deleted!"})
    });
    










module.exports={ResturantRoute}