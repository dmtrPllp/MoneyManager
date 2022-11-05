import { inject, injectable } from "inversify";
import { IConfigService } from "../config/IConfigService";
import { UserRegisterDto } from "../controllers/dto/user-reg-dto";
import { PrismaService } from "../database/PrismaService";
import { TYPES } from "../types";
import { IUserData } from "./interfaces/IUserData";
import { IUserService } from "./interfaces/IUserService";
import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import 'reflect-metadata';
import { HttpError } from "../errors/HttpErrors";
import { UserDto } from "../controllers/dto/UserDto";
import { ITokenServie } from "./interfaces/ITokenService";
import { IUserRepository } from "../database/repository/interfaces/IUserRepository";
import { UserLoginDto } from "../controllers/dto/user-login-dto";
import e from "express";
import { User } from "@prisma/client";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.TokenService) private tokenService: ITokenServie,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository
    ) { }

    async registrarion({ name, email, password }: UserRegisterDto): Promise<IUserData> {

        const candidate = await this.prismaService.client.user.findFirst({ where: { Email: email } });
        if (candidate) {
            throw new HttpError(400, `Пользователь с почтой ${email} уже сущетсвует!`);
        }
        const hashpassword = await hash(password, 3);
        const activationLink = v4();
        const user = await this.prismaService.client.user.create({ data: { Email: email, Name: name, Password: hashpassword } });
        //mailService
        return await this.generateTokensForUserDto(user);
    }

    async login({ email, password }: UserLoginDto): Promise<IUserData> {
        const user = await this.prismaService.client.user.findFirst({ where: { Email: email } });
        if (!user) {
            throw new HttpError(400, `Пользователь не сущетсвует!`)
        }
        if (!(await compare(password, user.Password))) {
            throw new HttpError(400, `Неверный пароль!`);
        }
        return await this.generateTokensForUserDto(user);
    }

    async generateTokensForUserDto(user: User): Promise<IUserData> {
        const userDto = new UserDto(user);
        const tokens = await this.tokenService.generateTokens({ ...UserDto });
        await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            accesstoken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            UserData: userDto
        }
    }
}