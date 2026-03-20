import crypto from "crypto";

export default function(){

return crypto

.randomBytes(5)

.toString("hex");

}