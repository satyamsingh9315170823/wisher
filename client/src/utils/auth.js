export const saveToken = (token)=>{

localStorage.setItem("token",token)

const payload = JSON.parse(atob(token.split(".")[1]))

localStorage.setItem("name",payload.name)

}

export const logoutUser = ()=>{

localStorage.removeItem("token")

localStorage.removeItem("name")

}

export const getToken = ()=>{

return localStorage.getItem("token")

}

export const getName = ()=>{

return localStorage.getItem("name")

}