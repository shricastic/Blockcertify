const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes');

const port  = process.env.PORT;

connectDB();  

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
})

