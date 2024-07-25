"use strict";

var jwt = require('jsonwebtoken');
var JWT_SECRET = process.env.JWT_SECRET;
var requireAuth = function requireAuth() {
  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (req, res, next) {
    var _req$headers$authoriz;
    var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }
    try {
      var decoded = jwt.verify(token, JWT_SECRET);
      if (role && decoded.role !== role) {
        console.log("Forbidden: ".concat(decoded.role, " is not authorized for this resource"));
        return res.status(403).json({
          error: "Forbidden"
        });
      }
      req.email = decoded.userId;
      console.log("Authorized user: ".concat(decoded.userId));
      next();
    } catch (error) {
      console.error("Error verifying token: ".concat(error.message));
      return res.status(401).json({
        error: "Unauthorized"
      });
    }
  };
};
module.exports = {
  requireAuth: requireAuth
};