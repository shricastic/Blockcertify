const Admin = require('../models/Admin');
const User = require('../models/User');
const Certificate = require('../models/Certificate');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const adminRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      res.status(400).json({ error: "User already registered" });
      return;
    }

    admin = new Admin({ username, email, password, role: "admin" });
    await admin.save();
    
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { userId: admin.email, role: "admin" }, 
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Admin logged in successfully");
    res.status(200).json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Dashboard = async(req, res) =>{
  res.json({ message: "Welcome to the Admin Dashboard!" })
}

const addUser = async (req, res) => {
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


function generateHashCode(name, prn, course, date) {
    const combinedString = `${name}${prn}${course}${date}`;
    const hash = crypto.createHash('sha256').update(combinedString).digest('hex');

    return hash;
}

const addCertificate = async (req, res) => {
  const { name, prn, course, date, email, issuedBy } = req.body;
  
  if (!name || !prn || !course || !date || !email) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  try {
    const certificateHash = generateHashCode(name, prn, course, date); 
   
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        prn,
        certificates: [],
        password: 'default123' 
      });
    }

    const newCertificate = new Certificate({
      name,
      prn,
      course,
      certificateHash,
      date,
      issuedBy
    });

    user.certificates.push(newCertificate);
    await user.save();

    res.status(200).json(newCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });    
  }
}

const getUsers = async(req, res) =>{
  try {
    const users = await User.find();

    if(users.length == 0){
      res.status(404).json({error:"No users found"});
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server error."});
  } 
}

const deleteUser = async(req, res) =>{
  const {email} = req.body;

  try {
    const user = await User.findOne({email});
    
    if(!user){
      res.status(400).json({error: "User does not exist"});
      return;
    }

    await User.deleteOne({email});
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal Server Error"});
  }
}

module.exports = { adminLogin, adminRegister, Dashboard, addUser, addCertificate, getUsers, deleteUser };

