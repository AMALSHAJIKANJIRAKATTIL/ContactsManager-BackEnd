const router = require("express").Router()
const bodyParser = require("body-parser");
const contactsModel = require("../models/contacts/contactModel");


const jwt=require('jsonwebtoken')


router.get("/contacts",async(req,res)=>{
    try{
        
        let decodedId=await jwt.decode(req.headers['token']);
        console.log(decodedId);
        const users = await contactsModel.find({user:decodedId.data});
        if(users.length){
            res.status(200).json({
                status:"success",
                data : users
            })
        }
        else{
            res.status(404).json({
                status:"failed",
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:"failed",
        })
    }
});

router.get("/contacts/:email",async(req,res)=>{
    try{

        const user = await contactsModel.findOne({email:req.params.email});
        if(user.email){
            res.status(200).json({
                status:"success",
                data :user
            })
        }
        else{
            res.status(404).json({
                status:"failed",
                message:"user does not exists"
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})




module.exports = router
