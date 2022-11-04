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

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) { }

    async registrarion({ name, email, password }: UserRegisterDto): Promise<IUserData> {
        try {
            const candidate = await this.prismaService.client.user.findFirst({ where: { Email: email } });
            if (!candidate) {
                throw new HttpError(444, `Пользователь с таким ${email} уже сущетсвует!`);
            }
            const hashpassword = await hash(password, 3);
            const activationLink = v4();
            const user = await this.prismaService.client.user.create({ data: { Email: email, Name: name, Password: hashpassword } });
            //mailService
            const userDto = new UserDto(user);
            //generateTokens
            //save refreshtoken in db

            return {
                //...tokens,
                accesstoken: 'adasd',
                refreshToken: 'bdas',
                UserData: userDto
            }
        } catch (e) {
            throw new HttpError(422, 'Such user is already exist');
        }
    }
}