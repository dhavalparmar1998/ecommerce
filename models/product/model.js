import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;


const productschema = new Schema({
    categoryid:String,
    brandid:String,
    productname:String,
    price:Number,
    discount:Number,
    description:String,
    filepath:String
});

const productmodel = mongoose.model("products",productschema);

export default productmodel;