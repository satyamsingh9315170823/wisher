import API from "../api/axios"
import { Copy, Trash2, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function WishCard({wish,refresh}){

const [copied,setCopied]=useState(false)

const del = async ()=>{

await API.delete("/wish/"+wish._id)

refresh()

}

const copy = ()=>{

navigator.clipboard.writeText(

window.location.origin+"/wish/"+wish.shareId

)

setCopied(true)

setTimeout(()=>setCopied(false),1500)

}

return(

<div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">

<div className="flex justify-between items-start">

<div>

<h2 className="text-white font-semibold text-lg">

{wish.recipientName}

</h2>

<p className="text-zinc-400 text-sm">

{new Date(wish.createdAt).toLocaleDateString()}

</p>

</div>

</div>

<div className="flex gap-2 mt-4 flex-wrap">

<button
onClick={copy}
className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-md"
>

<Copy size={14}/>

{copied ? "Copied" : "Copy"}

</button>

<a
href={"/wish/"+wish.shareId}
className="flex items-center gap-2 text-sm bg-white text-black hover:bg-zinc-200 px-3 py-2 rounded-md"
>

<ExternalLink size={14}/>

View

</a>

<button
onClick={del}
className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-red-700 text-zinc-300 hover:text-white px-3 py-2 rounded-md"
>

<Trash2 size={14}/>

Delete

</button>

</div>

</div>

)

}