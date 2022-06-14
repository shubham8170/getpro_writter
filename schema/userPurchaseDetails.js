const mongoose=require('mongoose');
var validator = require('validator');

const UserPurchaseDetails=new mongoose.Schema({
  userid:{
      type:String
  },
  productid:{
      type:String
  },
  date:{
    type:Date,
    default:Date.now()
  }
  
});

const userPurchase=new mongoose.model('userPurchase',UserPurchaseDetails);
module.exports=userPurchase;