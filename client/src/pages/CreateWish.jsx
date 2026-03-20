import {useState,useRef} from "react"
import API from "../api/axios"
import {useNavigate} from "react-router-dom"

export default function CreateWish(){
const [loading,setLoading]=useState(false)
const nav=useNavigate()

const fileInputRef = useRef()

const [files,setFiles]=useState([])

const [form,setForm]=useState({

recipientName:"",
message:"",
senderName:""

})

const change=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

})

}

const handleFiles=(e)=>{

setFiles([...files,...e.target.files])

}

const removeFile=(index)=>{

const updated=[...files]

updated.splice(index,1)

setFiles(updated)

}

const openFilePicker=()=>{

fileInputRef.current.click()

}

const submit=async(e)=>{

e.preventDefault()

if(loading) return

setLoading(true)

try{

const data=new FormData()

data.append("recipientName",form.recipientName)
data.append("message",form.message)
data.append("senderName",form.senderName)

for(let i of files){

data.append("media",i)

}

await API.post("/wish/create",data)

nav("/dashboard")

}catch(err){

alert("Failed to create wish")

}finally{

setLoading(false)

}

}

return(

<div className="min-h-screen bg-zinc-950 text-white">

<div className="max-w-3xl mx-auto px-4 py-16">

<div className="mb-10">

<h1 className="text-3xl sm:text-4xl font-semibold">
Create Birthday Wish 🎉
</h1>

<p className="text-zinc-400 mt-2">
Add message and memories to make it special
</p>

</div>

<form
onSubmit={submit}
className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-7 shadow-xl"
>

{/* Recipient */}

<div className="space-y-2">

<label className="text-sm text-zinc-400">
Recipient Name
</label>

<input
name="recipientName"
placeholder="Who is this wish for?"
className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
onChange={change}
/>

</div>

{/* Message */}

<div className="space-y-2">

<label className="text-sm text-zinc-400">
Birthday Message
</label>

<textarea
name="message"
placeholder="Write something meaningful..."
rows="4"
className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 resize-none"
onChange={change}
/>

</div>

{/* Sender */}

<div className="space-y-2">

<label className="text-sm text-zinc-400">
Your Name
</label>

<input
name="senderName"
placeholder="From whom?"
className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
onChange={change}
/>

</div>

{/* Upload */}

<div className="space-y-4">

<label className="text-sm text-zinc-400">
Upload Photos
</label>

<div className="border-2 border-dashed border-zinc-700 rounded-xl p-10 text-center bg-zinc-950 hover:border-zinc-500 transition">

<input
ref={fileInputRef}
type="file"
multiple
onChange={handleFiles}
className="hidden"
/>

<button
type="button"
onClick={openFilePicker}
className="flex flex-col items-center w-full"
>

<div className="bg-zinc-800 p-4 rounded-full hover:bg-zinc-700 transition">

<svg
xmlns="http://www.w3.org/2000/svg"
className="h-8 w-8 text-zinc-300"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>

<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={1.5}
d="M3 16l5-5m0 0l5 5m-5-5v12M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"
/>

</svg>

</div>

<p className="mt-4 text-zinc-300 font-medium">
Click to upload images
</p>

<p className="text-xs text-zinc-500 mt-1">
Upload multiple birthday memories
</p>

</button>

</div>

{/* Preview */}

{
files.length>0 &&(

<div className="space-y-3">

<p className="text-sm text-zinc-400">
Selected files ({files.length})
</p>

<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

{

files.map((file,index)=>(

<div
key={index}
className="relative bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 group"
>

<img
src={URL.createObjectURL(file)}
className="w-full h-32 object-cover"
/>

<button
type="button"
onClick={()=>removeFile(index)}
className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
>

✕

</button>

<div className="p-2 text-xs text-zinc-400 truncate">

{file.name}

</div>

</div>

))

}

</div>

</div>

)

}

</div>

<button
disabled={loading}
className={`w-full font-medium p-3 rounded-xl transition flex items-center justify-center gap-3

${loading
? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
: "bg-white text-black hover:bg-zinc-200"
}

`}
>

{loading && (

<div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"/>

)}

{loading ? "Creating Wish..." : "Create Wish 🎉"}

</button>

</form>

</div>

</div>

)

}