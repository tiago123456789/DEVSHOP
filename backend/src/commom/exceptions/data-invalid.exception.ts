import { AppException } from "./app.exception";


export class DataInvalidException extends AppException {
    
    statusCode = 400;

    constructor(message: string) {
        super(message);
        this.name = "DataInvalidException";

    }
}