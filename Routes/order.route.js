const express=require('express');
const { OrderModel } = require('../Models/order.model');
const OrderRoute=express.Router();


OrderRoute.get("/orders/:id",async(req,res)=>{
    const data=await OrderModel.find({_id:req.params.id});
    res.status(201).send(data)
});

OrderRoute.patch("/orders/:id",async(req,res)=>{
    await OrderModel.findByIdAndUpdate({_id:req.params.id},{status:req.body.status});
    res.status(201).send({msg:"order status updated"})
})

OrderRoute.post("/orders",async(req,res)=>{
    const {userID,items,totalPrice,deliveryAddress}=req.body;
    const order=await OrderModel({user:userID,items,totalPrice,deliveryAddress});
    order.save();
    res.status(201).send({msg:"order placed !"})
})




module.exports={OrderRoute}