import { inject, injectable } from "inversify";
import { IConfigService } from "../config/IConfigService";
import { UserRegisterDto } from "../controllers/dto/user-reg-dto";
import { PrismaService } from "../database/PrismaService";
import { TYPES } from "../types";
import { IUserData } from "./interfaces/IUserData";
import { IUserService } from "./interfaces/IUserService";
import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import 'reflect-metadata';
import { HttpError } from "../errors/HttpErrors";
import { UserDto } from "../controllers/dto/UserDto";
import { ITokenServie } from "./interfaces/ITokenService";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.TokenService) private tokenService: ITokenServie
    ) { }

    async registrarion({ name, email, password }: UserRegisterDto): Promise<IUserData> {

        const candidate = await this.prismaService.client.user.findFirst({ where: { Email: email } });
        if (candidate) {
            throw new HttpError(444, `Пользователь с таким ${email} уже сущетсвует!`);
        }
        const hashpassword = await hash(password, 3);
        const activationLink = v4();
        const user = await this.prismaService.client.user.create({ data: { Email: email, Name: name, Password: hashpassword } });
        //mailService
        const userDto = new UserDto(user);
        const tokens = await this.tokenService.generateTokens({ ...UserDto });
        await this.tokenService.saveToken(userDto.id, tokens.refreshToken)
        //save refreshtoken in db

        return {
            accesstoken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            UserData: userDto
        }
    }
}