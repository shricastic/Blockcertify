const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const requireAuth = (req, res, next) =>{
    const token = req.headers.authorization;
    
    if(token){
        jwt.verify(token, JWT_SECRET, (err, decodedToken) =>{
            if(err){
                res.status(401).json({error: 'Invalid token'});
            } else{
                req.userId = decodedToken.userId;
                next();
            }
        });
    } else{
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { requireAuth };