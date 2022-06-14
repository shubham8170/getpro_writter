const mongoose=require('mongoose');

const DB="mongodb+srv://getprowritter1:shubham123@cluster0.hm5tj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost:27017/getprowritter").then(()=>{
console.log("database connected successfully");
}).catch((e)=>{
console.log('error to connect with database');
})