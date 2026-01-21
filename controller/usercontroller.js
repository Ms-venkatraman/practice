const Responder = require("../helpers/responder");
const { jwtVerify } = require("../helpers/utils");

const dashboardController = async (req, res) => {
    try {
        const decoded = req.headers['authorization'];
        if(!decoded || decoded.split(' ')[0] !== 'Bearer' ){
            return Responder(res, {
                error: "No token provided",
                message: "Authorization token is missing",
                httpCode: 401,
            });
        }
        const result = jwtVerify(decoded.split(' ')[1], process.env.JWT_SECRET);
        console.log("Decoded JWT Token : ", decoded);
        return Responder(res, result);
    }
    catch (error) {
        console.error("Error in Dashboard Controller", error);
         return Responder(res, {
            error: `Internal Server Error ${error.message}`,
            httpCode: 500,
         });
    }   
}
module.exports = {
    dashboardController,
};
        

