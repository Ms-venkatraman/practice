const { validationResult } = require("express-validator");
const Responder = require("../helpers/responder");
const { signUpService, signInService } = require("../service/authServices");
const { jwtSign } = require("../helpers/utils");

    const signUpController = async (req, res) => {

       try {
        const hasErrors = validationResult(req);
        
        
         if(!hasErrors.isEmpty()){
         console.log("signUp hasError is : =========> :: ",hasErrors);
           return Responder(res, {
            error: hasErrors.errors[0].msg, 
            httpCode: 401,
            code: "validation_error",  
           })
        }

        if(req.body.password !== req.body.rePassword){
         return Responder(res, {
            error: "Password and Confirm Password do not match", 
            httpCode: 422,
            code: "password_mismatch",
        });   
        }   
        const result = await signUpService( req.body.Name, req.body.email, req.body.phone, req.body.password  );
         
        console.log("after return signUp service result is : =========> :: ",result);
        return Responder(res, result);
       } 
       catch (error) {
          console.error("Error in SignUp Controller", error);
         return Responder(res, {    
            error: "Internal Server Error",
            httpCode: 500,
         });
       } 
    }

    const signInController = async (req, res) => {
       try {
         const hasErrors = validationResult(req);
         if(!hasErrors.isEmpty()){
         console.log("login  hasError is : =========> :: ",hasErrors);

            return Responder(res, {
             error: hasErrors.array(), 
             httpCode: 422,
             code: "validation_error",  
            })
         }  
         const result = await signInService( req.body.email, req.body.password  );

         const jwtToken = await jwtSign({ email: req.body.email });
         console.log("Generated JWT Token : ", jwtToken);
         return Responder(res, { ...result, jwtToken } );

       } catch (error) {
         console.error("Error in SignIn Controller", error);
        return Responder(res, {  
            error: "Internal Server Error",error,
            httpCode: 500,
         });
       } 
    }
    module.exports = {
        signInController,
        signUpController
    }   