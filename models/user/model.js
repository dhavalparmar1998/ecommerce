import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userschema = new Schema({
    name:String,
    mobile:String,
    email:String,
    password:String,
    usertype:{
        type:Number,default: 1
    }
   
  });

  const usermodel = mongoose.model("users", userschema);

  export default usermodel;