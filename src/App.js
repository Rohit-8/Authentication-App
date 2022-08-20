import React, { useState } from "react";
import Login from "./components/login.js";
import Register from "./components/register.js";
import Homepage from "./components/homepage.js";
import {BrowserRouter,Routes, Route} from "react-router-dom";

function App() {

    const [user, setLoginUser] = useState({});

    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/> }/>
                    <Route path="/login" element={<Login setLoginUser={setLoginUser}/>} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
};

export default App;