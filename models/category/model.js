import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoryschema = new Schema({
    categoryName:String
   
  });

  const categorymodel = mongoose.model("categories", categoryschema);

  export default categorymodel;