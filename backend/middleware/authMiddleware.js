import jwt from "jsonwebtoken";

export default function(req,res,next){

try{

const authHeader=req.headers.authorization;

console.log("AUTH HEADER:",authHeader);

if(!authHeader){

return res.status(401).json({

message:"No token"

});

}

const token=authHeader.startsWith("Bearer ")

? authHeader.split(" ")[1]

: authHeader;

console.log("TOKEN:",token);

const decoded=jwt.verify(

token,

process.env.JWT_SECRET

);

console.log("DECODED:",decoded);

req.user={

id:decoded.id

};

next();

}catch(error){

console.log("AUTH ERROR:",error.message);

res.status(401).json({

message:"Invalid token"

});

}

}