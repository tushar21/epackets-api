module.exports = {
    success: success,
    error: error
}


function success(res, message = "Success", data= {}){
    res.send({
        message: message,
        status: "success",
        data: data
    })
}

function error(res, message = "Error", data= {},statusCode= 500){
    res.status(statusCode).send({
        message: message,
        status: "error",
        data: data
    })
}