const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes');

const port = process.env.PORT || 3000;

connectDB(); 

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
