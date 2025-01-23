const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/userModel"); // Adjust the path to your User model

dotenv.config();
const PORT = 6061;

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());

//db
// const users = [];

const sessions = new Set(); // jo users isme h they can generate new tokens

// app.get("/admin", (req, res) => {
//   // only for testing purpose
//   res.json(users);
// });

app.get("/profile", async(req,res) => {
  // Get the user name from                                 
})

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // const user = { username: username, password: hash };
    // users.push(user);
    const newUser = new User({ username, password: hash });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", hash });
  } catch (err) {
    return res.status(500).json({ message: "Internal serer error!" });
  }
});

app.post("/token", (req, res) => {
  const refresh_token = req.body.token;
  console.log(refresh_token);
  if (!sessions.has(refresh_token))
    return res.status(400).json({ message: "You need to log in" });
  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, token_data) {
      // console.log(token_data)f
      if (err)
        return res
          .status(403)
          .json({ message: "Forbidden", error: err.message });

      const token = generateToken({ user: token_data.user });
      return res.json({ token });
    }
  );
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  // const user = users.find((ele) => ele.username === username);
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Username not registered!" });
  }

  try {
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Incorrect password!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal serer error!" });
  }

  // const userInfo = { username: user.username };

  // console.log(userInfo);
  // const token_data = { user: userInfo };
  const token_data = { id: user._id };


  const refresh_token = jwt.sign(token_data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  sessions.add(refresh_token);
  console.log(sessions);

  const token = generateToken(token_data); // iski expire k baad refresh_toekn genereate karega

  return res.json({ token, refresh_token });
});

app.delete("/delete", (req, res) => {
  const refreshToken = req.body.token;
  if (!sessions.has(refreshToken)) {
    return res.status(400).json({ message: "No op" });
  }
  sessions.delete(refreshToken);
  return res.status(204).json({ message: "Logged out" });
});

function generateToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  }); // this token will  be sent to client
}

app.use((req, res) => {
  res.status(500).json({ message: "Internal server error!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
