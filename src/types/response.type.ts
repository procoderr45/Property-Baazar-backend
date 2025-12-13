export type ApiResponseType<T> = {
    status: "success" | "error";
    message?: string;
    data?: T;
};

export type AppErrorType<T> = {
    message?: string;
    statusCode?: number;
}