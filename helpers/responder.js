const responder = {
    successWithResult: (res, result) => {
        const jsonresponse = {
            success: true,
            data: result.data || null,
            message: result.message || 'Operation successful',
        }
        if(result.jwtToken){
            jsonresponse.jwtToken = result.jwtToken;
        }
        return res.status(200).send(jsonresponse);},

    failureWithResult: (res, result) => {
        return res.status(result.httpCode  || 500).json({
            success: false,
            error:   result.error,
            code : "validation error"

        });
    }
}

module.exports = (response, result) => {
  if (result.error) {
    return responder.failureWithResult(response, result);
  }
  return responder.successWithResult(response, result);
};