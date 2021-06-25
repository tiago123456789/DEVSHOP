import { AppException } from "./app.exception";


export class UnauthenticatedException extends AppException {
    
    statusCode = 401;

    constructor(message: string) {
        super(message);
        this.name = "UnauthenticatedException";

    }
}