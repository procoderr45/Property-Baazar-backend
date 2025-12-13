export class AppError extends Error {
    message: string;
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}
