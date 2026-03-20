import mongoose from "mongoose";

const wishSchema=new mongoose.Schema({

creator:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

recipientName:{
type:String,
required:true
},

message:String,

senderName:String,

media:{
type:[
{
url:{
type:String,
required:true
},

type:{
type:String,
required:true,
enum:["image","video"]
}
}
],
default:[]
},

shareId:{
type:String,
required:true,
unique:true,
index:true
}

},{timestamps:true});

export default mongoose.model("Wish",wishSchema);