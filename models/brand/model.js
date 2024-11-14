import mongoose from "mongoose";
const Schema = mongoose.Schema;

const brandschema = new Schema({
    brandName:String
   
  });

  const brandmodel = mongoose.model("brands", brandschema);

  export default brandmodel;