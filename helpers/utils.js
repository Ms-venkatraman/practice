const jwt = require('jsonwebtoken');
const responder = require('./responder');
const Utils = {
  jwtSign: async (payload) => {
    try {
        if(!payload){
            throw new Error("Payload is required for JWT signing");
        }
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRES_IN || '1d' };
        console.log("Signing JWT with payload:");
        return jwt.sign(payload, secret, options);

    } 
    catch (error) {
        console.error("Error signing JWT:", error);
        throw error;
    }
   
  },

  jwtVerify: (token) => {
    try {
      const secret = process.env.JWT_SECRET;
      const decodedjwt = jwt.verify(token, secret);
      if(!decodedjwt){
        return {
        error: 'Invalid or expired token',
        message: 'Token verification failed',
        httpCode: 401,
      };
      }
       return {
          data : "welcome to dashboard",
          message : "Token is valid",
        };
    } catch (err) {
      return {
        error: 'Invalid or expired token',
        message: err.message,
        httpCode: 401,
      };
    }   
    }
  
};

module.exports = Utils;