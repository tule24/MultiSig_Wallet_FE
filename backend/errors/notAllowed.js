import CustomAPIError from "./customError"
import { StatusCodes } from 'http-status-codes'

class NotAllowedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.METHOD_NOT_ALLOWED
    }
}

export default NotAllowedError