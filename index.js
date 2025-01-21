const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const PORT = 6060;

const app = express();

app.use(express.json());


app.get("/", authenticationToken, (req, res) => {  // hume get route chlana h aur ispe user ka naam aana chahiye aur pehela authenticate hona chahiye
  res.json({ message: `Hello ${req.user.username}` });
});



// Token authenticate krne ka logic
function authenticationToken(req, res, next) {
  // console.log(req.headers)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "You need to login!" }); //agr tokenn nhi h
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, token_data) {
    if (err) return res.status(400).json({ message: "Forbidden!", error: err });

    req.user = token_data.user; // This is correctly setting req.user

    // console.log(req.user.username)                                                                 //ISSUE
    next();
  });
}

app.use((req, res) => {
  res.status(500).json({ message: "Internal server error!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
