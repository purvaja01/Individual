import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpass] = useState("");

  const handlesubmit = async () => {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:7000/Signin", {
          email,
          password,
        });

        const token = response.data.token;

        // Store token secure
        localStorage.setItem("token", token);

        // Redirect to dashboard
        console.log(response);
        navigate("/Dashboard");
        console.log("done");
      } catch (error) {
        console.error("Sign-in error:", error);
      }
      //   const storedEmail = localStorage.getItem(email);
    } else {
      console.log("Enter Correct Credentials!");
      // Handle the case when the entered email doesn't match the stored email
    }
  };

  return (
    <div className="maincontainer">
      <div className="container-signin">
        <div className="image-container">
          <img src="standaed.png" className="img-1" />
        </div>
        <h3 className="headd">Sign in to Jin</h3>
        <br/>
        <button className="btn-btn2">Continue with O365</button>
        <p>or</p>
        <label>Email</label>
        <br/>
        <input
          htmlFor="email"
          type="email"
          placeholder="youremail@gmail.com"
          onChange={(e) => setEmail(e.target.value)} required
        />
        <br />
        <label>Password</label>
        <br />
        <input
          htmlFor="Password"
          type="password"
          placeholder="**********"
          id="password"
          name="password"
          onChange={(e) => setpass(e.target.value)}
        />
        <br />
        <br />
        <button className="btn-btn" onClick={handlesubmit}>
          Log In
        </button>
        <br />

        <button className="link-btn">
          <Link to="/Signup">Don't have an account? Signup here.</Link>
        </button>
      </div>
    </div>
  );
};

export default Signin;
