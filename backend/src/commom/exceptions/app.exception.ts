

export class AppException extends Error {

    protected statusCode: Number  = 500;

    constructor(message: string) {
        super(message);
        this.name = "AppException";
    }

    getStatusCode() {
        return this.statusCode;
    }

}