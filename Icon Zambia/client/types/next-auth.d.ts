import { JwtPayload } from "jwt-decode";
import NextAuth from "next-auth";

export interface userInfo {

    _id: string,
    name: string,
    email: string,
    picture: string,
    searchHistory: any[],
    __v: number,
    iat: number,
    exp: number
}

declare module "next-auth" {

    interface Session {
        access: string;
        refresh: string;
        error?: string;
        user: userInfo;
    }
    interface User {
        access: string;
        refresh: string;
    }

}

declare module "next-auth/jwt" {
    interface JWT {
        access: string;
        refresh: string;
        error?: string;
        userInfo: userInfo;
        iat: number;
        exp: number;
        jti: string;
    }

}



