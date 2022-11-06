import { ITokens, ITokenServie } from "./interfaces/ITokenService";
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IConfigService } from "../config/IConfigService";
import { PrismaService } from "../database/PrismaService";
import { Token } from "@prisma/client";
import 'reflect-metadata';
import { UserDto } from "../controllers/dto/UserDto";

@injectable()
export class TokenService implements ITokenServie {
    constructor(@inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService) { }



    async generateTokens(payload: any): Promise<ITokens> {
        const accessToken = sign(payload, this.configService.get('JWT_ACCESS_SECRET'), {
            expiresIn: '15m'
        });
        const refreshToken = sign(payload, this.configService.get('JWT_REFRESH_SECRET'), {
            expiresIn: '30d'
        });
        return {
            accessToken,
            refreshToken
        }
    };
    async validateAccessToken(token: string): Promise<string | JwtPayload | null> {
        try {
            const UserData = verify(token, this.configService.get('JWT_ACCESS_TOKEN'));
            return UserData as UserDto;
        } catch (e) {
            return null;
        }
    };
    async validateRefreshToken(token: string): Promise<string | JwtPayload | null> {
        try {
            const UserData = verify(token, this.configService.get('JWT_REFRESH_SECRET'));
            return UserData as UserDto;
        } catch (e) {
            return null;
        }
    };
    async saveToken(userId: number, refreshToken: string): Promise<Token | null> {
        const tokenData = await this.prismaService.client.token.findFirst({ where: { userId } });
        if (tokenData) {
            await this.prismaService.client.token.update({
                where: { userId },
                data: { refreshToken }
            });
            return null;
        }
        const token = await this.prismaService.client.token.create({ data: { userId, refreshToken } });
        return token;
    };
    async removeToken(refreshToken: string): Promise<Token> {
        const tokenData = await this.prismaService.client.token.delete({
            where: {
                refreshToken
            },
        });
        return tokenData;
    };
    async findToken(refreshToken: string): Promise<Token | null> {
        const tokenData = await this.prismaService.client.token.findFirst({ where: { refreshToken } });
        return tokenData;
    };

}