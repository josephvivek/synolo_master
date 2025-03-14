import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home"
import User from "./pages/User";
import Design from "./pages/Design"
import process from "process";


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/create' element={<CreateAccount/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/design" element={<Design/>}></Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default App;