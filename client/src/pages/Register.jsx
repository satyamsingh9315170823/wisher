import {useState,useEffect} from "react"
import API from "../api/axios"
import {saveToken} from "../utils/auth"
import {useNavigate, Link} from "react-router-dom"

export default function Register(){

const nav=useNavigate()

useEffect(()=>{

const token = localStorage.getItem("token")

if(token){
nav("/dashboard")
}

},[])

const [form,setForm]=useState({

name:"",
email:"",
password:""

})

const change=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

})

}

const submit=async(e)=>{

e.preventDefault()

try{

const res=await API.post(
"/auth/register",
form
)

saveToken(res.data.token)

nav("/dashboard")

}catch(err){

alert(
err?.response?.data?.message ||
"Registration failed"
)

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">

<form
onSubmit={submit}
className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl space-y-6"
>

<div className="space-y-2 text-center">

<h2 className="text-3xl font-semibold text-white">
Create Account
</h2>

<p className="text-zinc-400 text-sm">
Register to start creating wishes
</p>

</div>

<div className="space-y-4">

<input
name="name"
placeholder="Full name"
className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
onChange={change}
/>

<input
name="email"
placeholder="Email"
className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
onChange={change}
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
onChange={change}
/>

</div>

<button className="w-full p-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition">
Register
</button>

<div className="text-center">

<Link to="/">
<p className="text-sm text-zinc-400 hover:text-white transition cursor-pointer">
Already have an account? Login
</p>
</Link>

</div>

</form>

</div>

)

}