export const saveToken=(token)=>{

if(token){

localStorage.setItem(
"token",
token
)

}

}

export const logout=()=>{

localStorage.removeItem("token")

}

export const isAuth=()=>{

const token=localStorage.getItem("token")

return token && token!=="undefined"

}