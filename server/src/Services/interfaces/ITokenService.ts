import { Token } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenServie {
    generateTokens: (payload:any)=> Promise<ITokens>;
    validateAccessToken: (token:string) => Promise<string | JwtPayload | null>;
    validateRefreshToken: (token:string) => unknown;
    saveToken: (userId:number,refreshToken:string) => Promise<Token | null>;
    removeToken:(refreshToken:string) => unknown;
    findToken:(refreshToken:string) =>  Promise<Token | null>;
}