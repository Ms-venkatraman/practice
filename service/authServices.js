const Respository = require("../repository/DbRespository");

const signUpService = async (Name, email, phone, password) => {
    try {
        const user = await Respository.findOne('users',{where: {email}});
        if(user){
            return {
                error: "Email already exists", 
                httpCode: 409,
            }; 
        }

        const result = await Respository.create('users', {Name, email, phone, password});
        console.log("after return create result is : =========> :: ",result);
        return {
            data: result,
            message: "User registered successfully"
        }; 
    } 
    catch (error) {
         return {    
                    error: "service  Internal Server Error ",
                    httpCode: 500,
                 };
    }

}

const signInService = async ( email, password) => {
    try {
        const user = await Respository.findOne('users', {where: {email}});

        if(!user){
            return {
                error: "user not found", 
                httpCode: 401,
            }; 
        }   
        if(user.password !== password){
            return {
                error: "Invalid email or password", 
                httpCode: 401,
            }; 
        }       
        return {
            data: user,
            message: "User signed in successfully"
        }; 
    } 
    catch (error) {
        console.error("Error in signInService:", error);
        return {
                error: "Internal Server Error",
                httpCode: 500,
             };
    }           
}

module.exports = {
    signUpService,
    signInService
}   