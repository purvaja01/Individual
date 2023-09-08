const express = require("express");
const sql = require("mssql");
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


require("dotenv").config();

var config = {
    server : process.env.SERVER || '',
    database : process.env.DATABASE,
    user:process.env.USER,
    password: process.env.PASSWORD,
    options : {
        encrypt:true
    },
};


const pool = new sql.ConnectionPool(config)

async function dbcon(){
    try {
        await pool.connect()
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:",error);
    }
}

dbcon()

// In your Node.js server code
app.post("/Signup", async (req, res) => {
    try {
        const Data = req.body;
        console.log("DATA->",Data);
        
        // Construct the SQL INSERT query
        const insertQuery = `INSERT INTO tbl_users (email, fullname, id, password) VALUES ('${Data.email}', '${Data.name}', '${Data.id}', '${Data.password}')`;

        // Execute the query using your SQL library (e.g., mssql)
        await pool.request().query(insertQuery);
       
        res.json({ msg: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/Signin", async (req, res) => {
    const { email, password } = req.body;
    console.log({email,password});
    try {
      const pool = await sql.connect(config);
      
      // Query the database to find the user by email
      const result = await pool
        .request().input("email", sql.VarChar(60), email).query("SELECT * FROM tbl_users WHERE email = @email");

      const user = result.recordset[0]; //returns a single user
  
      if (!user || user.password !== password) {
        console.log("wrong")
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const secretKey = process.env.JWT_SECRET_KEY || "fallbackSecretKey";
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
  
      res.json({ token });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


PORT = process.env.PORT || 8085

app.get('/',function(req,res){
    res.send("<p>Welcome to Signin page</p>")
});
app.get('/Signup',function(req,res){
    res.send("<p>Welcome to Signup page</p>")
});

app.listen(PORT, function(){
    console.log(`server is listening to port ${PORT}`)
})