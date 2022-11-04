import { JwtPayload } from "jsonwebtoken";

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenServie {
    generateTokens: (payload:any)=> ITokens;
    validateAccessToken: (token:string) => void;
    validateRefreshToken: (token:string) => void;
    saveToken: (userId:number,refreshToken:string) => void;
}