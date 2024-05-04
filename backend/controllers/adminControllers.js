const Admin = require('../models/Admin');
const User = require('../models/User');
const Certificate = require('../models/Certificate');

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

    admin = new Admin({ username, email, password });
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

    console.log("Admin logged in successfully");
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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

    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        const char = combinedString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash;
    }
    return hash;
}

const addCertificate = async (req, res) =>{
  const{name, prn, course, date, email} = req.body;
  
  if(!name || !prn || !course || !date || !email){
    res.status(400).json({error: "All fields are mendatory"});
    return;
  }

  try {
    const hashCode = generateHashCode(name, prn, course, date);
    
    let user = await User.findOne({email});

    if(!user){
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
      date, 
      hashCode
    });

    user.certificates.push(newCertificate);
    await user.save();

    res.status(200).json(newCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal Server Error"});    
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

module.exports = { adminLogin, adminRegister, addUser, addCertificate, getUsers, deleteUser };

