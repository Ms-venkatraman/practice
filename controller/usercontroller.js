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
const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return Responder(res, {
                error: "No file uploaded",  
                httpCode: 400,
            });
        }
        console.log("Uploaded file info: ", req.file);
        return Responder(res, {
            message: "File uploaded successfully",
            fileInfo: req.file,
            httpCode: 200,
        });
    }
    catch (error) {
        console.error("Error in Upload Image Controller", error);
         return Responder(res, {   
            error: "Internal Server Error",
            httpCode: 500,
            });
    }
}


module.exports = {
    dashboardController,
    uploadImageController
};
        

