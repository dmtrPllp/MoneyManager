import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserRegisterDto } from '../controllers/dto/user-reg-dto';
import { HttpError } from '../errors/HttpErrors';
import { ITokenServie } from '../services/interfaces/ITokenService';
import { TYPES } from '../types';
import { IMiddleware } from './IMiddleware';


export class AuthMiddleware implements IMiddleware {
    constructor(@inject(TYPES.TokenService) private tokenService?: ITokenServie,) { }
    async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new HttpError(401, 'Пользователь не авторизован!');
            }
            const accessToken = authorization.split(' ')[1];
            if (!accessToken) {
                throw new HttpError(401, 'Пользователь не авторизован!');
            }
            const userData = await this.tokenService!.validateAccessToken(accessToken);
            if (!userData) {
                throw new HttpError(401, 'Пользователь не авторизован!');
            }
            req.user = userData;
            next();
        } catch (e) {
            next(new HttpError(401, 'Пользователь не авторизован!'));
        }
    }
}