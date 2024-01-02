// Created a class to provide a custom error handler / error message
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export default ErrorHandler;