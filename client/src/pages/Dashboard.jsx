import {useEffect,useState} from "react"
import API from "../api/axios"
import WishCard from "../components/WishCard"
import {Link} from "react-router-dom"

export default function Dashboard(){

const [wishes,setWishes]=useState([])

const load=async()=>{

const res=await API.get("/wish/my")

setWishes(res.data)

}

useEffect(()=>{

load()

},[])

return(

<div className="min-h-screen bg-zinc-950 text-white">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

{/* Header */}

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

<div>

<h1 className="text-3xl sm:text-4xl font-semibold">
Dashboard
</h1>

<p className="text-zinc-400 mt-2">
Manage your birthday wishes
</p>

</div>

<Link
to="/create"
className="bg-white text-black px-5 py-3 rounded-xl font-medium hover:bg-zinc-200 transition w-fit"
>

Create Wish

</Link>

</div>

{/* Content */}

<div className="mt-12">

{
wishes.length === 0 ? (

<div className="border border-zinc-800 bg-zinc-900 rounded-2xl p-16 text-center">

<h2 className="text-xl font-medium">
No wishes yet
</h2>

<p className="text-zinc-400 mt-3">
Create your first personalized birthday wish
</p>

<Link
to="/create"
className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl hover:bg-zinc-200 transition"
>
Create First Wish
</Link>

</div>

):( 

<div className="grid 
grid-cols-1 
sm:grid-cols-2 
lg:grid-cols-3 
xl:grid-cols-4 
gap-6">

{

wishes.map(w=>(

<WishCard
key={w._id}
wish={w}
refresh={load}
/>

))

}

</div>

)

}

</div>

</div>

</div>

)

}