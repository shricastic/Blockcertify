const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const requireAuth = (role = null) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (role && decoded.role !== role) {
        console.log(`Forbidden: ${decoded.role} is not authorized for this resource`);
        return res.status(403).json({ error: "Forbidden" });
      }
      
      req.email = decoded.userId;
      
      console.log(`Authorized user: ${decoded.userId}`);
      next();
    } catch (error) {
      console.error(`Error verifying token: ${error.message}`);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};

module.exports = { requireAuth };
