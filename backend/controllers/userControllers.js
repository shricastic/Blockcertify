const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const registerUser = async (req, res) => {
  const { username, email, prn, password } = req.body;

  if (!username || !email || !prn || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }
  
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ error: "User already registered" });
      return;
    }

    user = new User({
      username,
      email,
      prn,
      certificates: [], 
      password
    });

    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }
  
  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user.email, role: "user" }, 
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("User logged in successfully");
    res.status(200).json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCertificates = async(req, res) =>{
  const email = req.email;

  try {
    const user = await User.findOne({email});
    
    if(!user){
      res.status(400).json({error:"User does not exist"});
      return;
    }

    res.status(200).json(user.certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal Server Error"});
  }
}

const verify = async (req, res) => {
  const { prn, hashcode } = req.body;

  if (!prn || !hashcode) {
    res.status(400).json({ error: "PRN and Hashcode are mandatory" });
    return;
  }

  try {
    const user = await User.findOne({ prn });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const certificate = user.certificates.find(cert => cert.certificateHash === hashcode);

    if (!certificate) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }

    res.status(200).json({ message: "Certificate verified", certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { registerUser, loginUser, getCertificates, verify };
 

