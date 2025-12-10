export type ApiResponseType<T> = {
    status: "success" | "error";
    message?: string;
    data?: T;
};
