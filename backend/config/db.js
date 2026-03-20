import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

const connectDB=async()=>{

try{

await mongoose.connect(

process.env.MONGO_URI

);

console.log("DB connected");

}catch(error){

console.log(error);

process.exit();

}

};

export default connectDB;