const express=require('express');
const router=express.Router();
const bcrypt = require('bcrypt');
const UserSchema=require('../schema/userSchema');
const Guestpost=require('../schema/guestPost')



// get guestpots data

// router.get('/getguestpost',async(req,res)=>{
//     try{
//         const guestpost=await Guestpost.find();
//         res.status(200).send(guestpost);
//     }
//     catch(e){
//         res.status(400).send({
//             message:"Error to get data"
//         });
//     }
// })


module.exports=router;