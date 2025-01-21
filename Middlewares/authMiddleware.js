// const User = require("../Models/userSchema"); // Adjust the path to your User model



//  const Login = async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ message: "Username and password are required." });
//     }
//     // const user = users.find((ele) => ele.username === username);
//     const user = await User.findOne({ username });
  
//     if (!user) {
//       return res.status(401).json({ message: "Username not registered!" });
//     }
  
//     try {
//       const isMatched = await bcrypt.compare(password, user.password);
//       if (!isMatched) {
//         return res.status(401).json({ message: "Incorrect password!" });
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Internal serer error!" });
//     }
  
//     const userInfo = { username: user.username };
//     // console.log(userInfo);
//     const token_data = { user: userInfo };
  
//     const refresh_token = jwt.sign(token_data, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: "20s",
//     });
//     sessions.add(refresh_token);
//     console.log(sessions);
  
//     const token = generateToken(token_data); // iski expire k baad refresh_toekn genereate karega
  
//     return res.json({token, refresh_token });
//   };

//   const Register = async (req, res) => {
//     try {
//       const { username, password } = req.body;
  
//       if (!username || !password) {
//         return res
//           .status(400)
//           .json({ message: "Username and password are required." });
//       }
  
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: "Username already exists." });
//       }
  
//       const salt = await bcrypt.genSalt();
//       const hash = await bcrypt.hash(password, salt);
//       // const user = { username: username, password: hash };
//       // users.push(user);
//       const newUser = new User({ username, password: hash });
//       await newUser.save();
  
//       res.status(201).json({ message: "User created successfully", hash });
//     } catch (err) {
//       return res.status(500).json({ message: "Internal serer error!" });
//     }
//   }


//   module.exports = { Login, Register };
