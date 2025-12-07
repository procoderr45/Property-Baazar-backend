class AppError {
    message: string;
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}
