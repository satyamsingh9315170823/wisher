import jwt from "jsonwebtoken";

export default function(id){

return jwt.sign(

{id:id},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);

}