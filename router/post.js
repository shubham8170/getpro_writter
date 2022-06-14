const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserSchema = require('../schema/userSchema');
const Guestpost = require('../schema/guestPost');
const userPurchase = require('../schema/userPurchaseDetails');
const res = require('express/lib/response');
const moment=require('moment');
let now=moment();


//user registration

router.post('/register', async (req, res) => {
    try {
        const hashpassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hashpassword,
            content_type: req.body.content_type,
            level: req.body.level
        }
        const databasedata = UserSchema(data);
        const saved_data = await databasedata.save();
        res.status(200).send(saved_data);
    }
    catch (e) {
        console.log(e.message);
        res.status(304).send("hello")
    }

});


// user login
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await UserSchema.find({ email });
        var user_data = JSON.stringify(user[0]);
        var user_parse_data = JSON.parse(user_data);
        const is_verified = await bcrypt.compare(password, user_parse_data.password);
        if (is_verified) {
            res.status(200).send(user)
        }
        else {
            res.status(400).send({
                message: "emil or password is incorect"
            })
        }
    }
    catch (e) {
        res.status(400).send({
            message: "emil or password is incorect"
        })
    }
});

// user purchase or place order
router.post('/buyproduct', async (req, res) => {

    // push the data into the array is not working. need to perform update instead of save/create
    try {
        const userId = req.body.userid;
        const productid = req.body.productid;

        const productDetails=await Guestpost.find({_id:productid})
        const qnt=req.body.qnt;

        var guestpost_data = JSON.stringify(productDetails[0]);
        var guestpost_parse_data = JSON.parse(guestpost_data);
        let totalPr=qnt*guestpost_parse_data.point;
        console.log(typeof qnt);
        console.log(typeof  guestpost_parse_data.price);
        let totalPrice=qnt* guestpost_parse_data.price;
        console.log(totalPr);
        console.log("before ",totalPrice);
        if(totalPr==2){
            totalPrice-=(totalPrice*10)/100;
        }
        else  if(totalPr==3 || totalPr==4){
            totalPrice-=(totalPrice*20)/100;
        }
        else if(totalPr>=5){
            totalPrice-=(totalPrice*30)/100;
        }
        console.log("after ",totalPrice);
        guestpost_parse_data.price=totalPrice;
        guestpost_parse_data.qnt=qnt;
        guestpost_parse_data.point=totalPr;
        console.log(guestpost_parse_data.point);
        // const purchase_data = {
        //     userid: userId,
        //     purchaselist: productid
        // }
        // const save_purchase_data = await userPurchase(purchase_data);
        // save_purchase_data.save();
        res.status(200).send(guestpost_parse_data)
    }
    catch (e) {
        console.log(e);
        res.send({
            message: "ERROR"
        })
    }
})




//make subscription 


router.post('/buysubscriptions',async(req,res)=>{
    try{
        console.log(now);

  
        console.log(now.format('MMM Do YY'))
        let previous_date=now.subtract(28,'day');
        // console.log(previous_date.format('MMM Do YY'))
        // console.log(new Date("2022-06-03T18:24:03.774+00:00"));
         let savedate=new Date("2022-06-03T18:24:03.774+00:00");
        // console.log(savedate-10);
        // console.log(Date.now());

        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate() - 28));
        const userId = req.body.userid;
        const productid = req.body.productid;
        // let d=userPurchase(req.body);
        // await d.save();

        const data=await userPurchase.find( { date: { $gte: priorDate} ,userid:userId,productid:productid} )
        if(data.length>0){
            throw new Error("You can not do this");
        }
        else{
            res.send(data)
        }
        // console.log(today)
        // console.log(priorDate);
        // if(priorDate>today){
        //     console.log('ager date');
        // }
        // if(priorDate<today){
        //     console.log('akhon date');
        // }
        // if(today>savedate){
        //     console.log('database');
        // }
        // if(today<=savedate){
        //     console.log('database1');
        // }
        // console.log(now);
        // console.log(new Date(previous_data));
        

        // const userId = req.body.userid;
        // const productid = req.body.productid;
        // // const productDetails=await Guestpost.find({_id:productid})
        // const qnt=req.body.qnt;
        // const getSubscriptionData=await userPurchase.find({"userid":userId,"productid":productid})
        // if(getSubscriptionData.length==0){
        //     const data=new userPurchase(req.body);
        //     const saved_data=await data.save();
        //     res.send(saved_data);
        // }
        // else{

        //     var subscriptionStringify = JSON.stringify(getSubscriptionData[0]);
        // var subscriptionParse= JSON.parse(subscriptionStringify);
        // let today=new Date.now();
        // let previous_date=now.subtract(1,'day');

        // }
       

    }
    catch(e){
        res.status(404).send(e.message)
    }
})

//get guestpost data

router.post('/getguestpost', async (req, res) => {
    try {
        const userid = req.body.userId;
        const guestpost = await Guestpost.find();
        // var guestpost_data = JSON.stringify(guestpost);
        // var guestpost_parse_data = JSON.parse(guestpost_data);
        // var all_guestpost = [];
        // for (var i = 0; i < guestpost_parse_data.length; i++) {
        //     const data = await userPurchase.find({ "userid": userid, "purchaselist": guestpost_parse_data[i]._id })
        //     if (data.length > 0) {
        //         const actual_price = guestpost_parse_data[i].price - (guestpost_parse_data[i].price * 20) / 100;
        //         guestpost_parse_data[i].actual_price = actual_price;

        //     }
        //     else {
        //         guestpost_parse_data[i].actual_price = guestpost_parse_data[i].price;
        //     }
        // }
        res.status(200).send(guestpost);
    }
    catch (e) {
        res.status(400).send({
            message: "Error to get data"
        });
    }
})



module.exports = router;