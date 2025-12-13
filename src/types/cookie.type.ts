export type CookieOptions = {
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax",
    secure: boolean;
}