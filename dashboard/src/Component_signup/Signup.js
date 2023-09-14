  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from 'axios';

  // import { Link } from "react-router-dom";

  export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setpass] = useState("");
    const [id, setid] = useState("");
    const [FullName, setname] = useState("");
    const [cpass, setcpass] = useState("");
    const [error, setError] = useState(""); // State for error message

    const handlesubmit = async () => {
      const data = {
        id: id,
        name: FullName,
        email: email,
        password: pass
      }
      if (id.trim() !== "" && FullName.trim() !== "" && email !== "" && pass.trim() !== "" && cpass.trim() !== "") {
        const empIdPattern = /^JMD\d+$/;
        if (!empIdPattern.test(id)) {
            alert("Enter your Employee ID 'EMP...'")
          return;
        } else {
          setError(""); // Clear the error message if ID is valid
        }
        try {
          const response = await axios.post("http://localhost:7000/Signup", data);
          console.log(response.msg);
        }
        catch (error) {
          console.log("error:", error);
        }
      }
      if (pass === cpass) {
        
        
        let availableEmail = false;

        Object.keys(localStorage).forEach((exists) => {
          if (exists === email) {
            availableEmail = true;
          }
        });

        if (availableEmail === false) {
          const userData = {
            fullname: FullName,
            id: id,
            password: pass
          };

          localStorage.setItem(email, JSON.stringify(userData));

          alert("Registered Successfully");

          navigate("/");
        } else {
          setError("Email already exists. Enter correct credentials.");
        }
      } else {
        setError("Password does not match.");
      }
   
  };

    return (
      <div className="auth-form-container">
        <img src='standaed.png'  className="img-1"/>
        <h3 className="headd">Sign Up Now</h3><br />
        <label>Emp_id</label>
        <br />
        <input htmlFor="id" type="text" placeholder="JMD_" onChange={(e) => setid(e.target.value)} required />
        <br />
        <label>Name</label>
        <br />
        <input htmlFor="FullName" type="text" placeholder="Full Name" onChange={(e) => setname(e.target.value)} required />
        <br />
        <label>Email</label>
        <br />
        <input
          htmlFor="email"

          type="email"
          placeholder="youremail@gmail.com" onChange={(e) => setEmail(e.target.value)} required
        />
        <br />
        <label>Password</label>
        <br />
        <input
          htmlFor="Password"

          type="password"
          placeholder="**********"
          id="password"
          name="password" onChange={(e) => setpass(e.target.value)} required
        />
        <br />
        <label>Confirm Passowrd</label>
        <br />
        <input
          htmlFor="Confirm Passowrd"

          type="password"
          placeholder="**********"
          id="cpassword"
          name="cpassword" onChange={(e) => setcpass(e.target.value)} required
        />
        <br />
        <br />
        <button className="btn-btn" onClick={handlesubmit}>Sign Up</button><br />

        <button className="link-btn">
          <Link to="/">Already have an Account? Signin here.</Link>
        </button><br/><br/>
      </div>
    );
  };

  export default Signup;
