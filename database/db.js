// mongodb+srv://admin:<db_password>@cluster1.3xukv.mongodb.net/

import mongoose from "mongoose";

async function dbconnect(){
    await mongoose.connect('mongodb+srv://admin:admin@cluster1.3xukv.mongodb.net/dhavalnode');
}

export default dbconnect;