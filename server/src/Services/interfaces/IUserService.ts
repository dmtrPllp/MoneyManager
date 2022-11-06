import { User } from "@prisma/client";
import { UserLoginDto } from "../../controllers/dto/user-login-dto";
import { UserRegisterDto } from "../../controllers/dto/user-reg-dto";
import { IUserData } from "./IUserData";

export interface IUserService {
    registrarion: (dto: UserRegisterDto) => Promise<IUserData>;
    login: (dto: UserLoginDto) => Promise<IUserData>;
    activate: (activationLink: string) => Promise<void>;
    refresh: (refreshToken:string) => Promise<IUserData | null>;
    // logout: (refreshToken: string) => Promise<boolean>;
}