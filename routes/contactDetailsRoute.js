const router = require("express").Router();
const contactsModel = require("../models/contacts/contactModel");


const jwt=require('jsonwebtoken')


router.get("/",async(req,res)=>{
    try{
        
        
        const users = await contactsModel.find({user:req.user.data});
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

router.get("/:email",async(req,res)=>{
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
