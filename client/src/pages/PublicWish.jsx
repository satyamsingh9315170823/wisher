import { useParams } from "react-router-dom";
import { useEffect,useState,useRef } from "react";
import API from "../api/axios";
import { Carousel,Card } from "../components/ui/apple-cards-carousel";

export default function PublicWish(){

const {shareId}=useParams()

const [wish,setWish]=useState(null)

const [open,setOpen]=useState(false)

const [slide,setSlide]=useState(0)

const videoRef=useRef(null)

useEffect(()=>{

API.get("/wish/"+shareId)

.then(res=>setWish(res.data))

},[shareId])


useEffect(()=>{

if(!open||!wish)return

const imgs=wish.media.filter(

m=>m.type==="image"

)

if(imgs.length===0)return

const timer=setInterval(()=>{

setSlide(

prev=>prev===imgs.length-1?0:prev+1

)

},3500)

return()=>clearInterval(timer)

},[open,wish])


if(!wish)return null


const images=wish.media.filter(

m=>m.type==="image"

)

const video=wish.media.find(

m=>m.type==="video"

)


const cards=images.map((img,index)=>(

<Card

key={index}

card={{

src:img.url,

content:(

<div className="space-y-6">

<img

src={img.url}

className="rounded-2xl w-full object-cover max-h-[500px]"

alt="memory"

/>

<p className="text-zinc-400 text-center text-lg">

Beautiful memory ❤️

</p>

</div>

)

}}

/>

))


return(

<div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

{!open&&(

<div className="fixed inset-0 flex flex-col items-center justify-center">

<button

onClick={()=>setOpen(true)}

className="transition duration-500 hover:scale-110"

>

<div className="text-[110px] md:text-[150px] animate-bounce">

🎁

</div>

</button>

<p className="mt-6 text-zinc-500 text-xs tracking-[0.4em] uppercase">

Tap Gift

</p>

</div>

)}


{open&&(

<>

<div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">

{images.map((img,i)=>(

<img

key={i}

src={img.url}

className={`

absolute

inset-0

w-full

h-full

object-cover

transition

duration-1000

${slide===i?"opacity-30":"opacity-0"}

`}

/>

))}

<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"/>

<div className="absolute inset-0 flex flex-col items-center justify-center text-center">

<h1 className="text-4xl md:text-6xl font-black">

HAPPY BIRTHDAY

</h1>

<p className="mt-4 text-fuchsia-400 tracking-widest uppercase text-xs">

{wish.recipientName}

</p>

</div>

</div>


<main className="max-w-7xl mx-auto pb-24 space-y-20">

<div className="px-6">

<div className="bg-zinc-900 p-8 md:p-14 rounded-[2rem] border border-white/10 shadow-xl">

<h2 className="text-3xl md:text-6xl font-bold text-fuchsia-400 mb-6">

{wish.recipientName}

</h2>

<p className="text-lg md:text-2xl text-zinc-300 italic">

"{wish.message}"

</p>

<p className="mt-8 text-fuchsia-400 text-xs tracking-widest uppercase">

{wish.senderName}

</p>

</div>

</div>


<div className="space-y-6">

<h3 className="text-2xl md:text-4xl text-center font-bold">

Memories

</h3>

<Carousel items={cards}/>

</div>


{video&&(

<div className="px-6">

<div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-xl">

<video

ref={videoRef}

src={video.url}

loop

autoPlay

playsInline

className="w-full object-cover"

/>

</div>

</div>

)}


<footer className="text-center pt-16 opacity-40">

<p className="text-xs tracking-[0.5em] uppercase">

Made with ❤️

</p>

</footer>

</main>

</>

)}

</div>

)

}