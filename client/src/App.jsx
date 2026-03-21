import {BrowserRouter,Routes,Route} from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreateWish from "./pages/CreateWish"
import PublicWish from "./pages/PublicWish"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Landing/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/create" element={<CreateWish/>}/>

<Route path="/wish/:shareId" element={<PublicWish/>}/>

</Routes>

</BrowserRouter>

)

}

export default App