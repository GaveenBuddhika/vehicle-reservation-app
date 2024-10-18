const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const axios = require("axios");
const sanitizeHtml = require("sanitize-html");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vehicle_service_reservation",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

const server = app.listen(port,()=>{

  console.log(`server running in port ${port}`)
  
  
  });

const verifyJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "",
  }),
  audience: "",
  issuer: "",
  algorithms: ["RS256"],
});

app.use(verifyJwt);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/reservation", async (req, res) => {
  const {
    date,
    time,
    location,
    vehicle_no,
    mileage,
    message,
    username,
    email,
  } = req.body;
  console.log(message);
  const date1 = sanitizeHtml(date);
  const time1 = sanitizeHtml(time);
  const location1 = sanitizeHtml(location);
  const vehicle_no1 = sanitizeHtml(vehicle_no);
  const mileage1 = sanitizeHtml(mileage);
  const message1 = sanitizeHtml(message);
  const username1 = sanitizeHtml(username);
  const email1 = sanitizeHtml(email);
  console.log(message1);
  const query =
    "INSERT INTO reservations (date, time, location, vehicle_no, mileage, message, username,email) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
  db.query(
    query,
    [date1, time1, location1, vehicle_no1, mileage1, message1, username1, email1],
    (err, result) => {
      if (err) throw err;
      res.send("Reservation added");
    }
  );
});

app.get("/reservations", (req, res) => {
  const email = req.query.email;
  console.log(email);
  const query = `SELECT * FROM reservations WHERE email = ?`;
  db.query(query,[email] ,(err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.delete("/reservations", (req, res) => {
  const id = req.query.id;
 
  const query = `DELETE FROM reservations WHERE booking_id = ?;`;
  db.query(query,[id] ,(err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});


app.get('/profile',async(req,res)=>{
const accessToken=req.headers.authorization.split(' ')[1];
const response=await axios.get('',{
  headers:{
    authorization:`Bearer ${accessToken}`
  }
})
const userinfo=response.data;
res.send(userinfo)
console.log(response.data)
})


