import React from "react";
import "./App.css";
import { Signin } from "./Component_signin/Signin.js";
import { Signup } from "./Component_signup/Signup.js";
import {Dashboard} from "./Component_dash/Dashboard.js";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/Signup"  element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard/>} />

            </Routes>
        </Router>
      
    </div>
  );
}

export default App;
