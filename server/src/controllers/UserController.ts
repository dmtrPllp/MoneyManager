import { inject, injectable } from "inversify";
import { BaseController } from "../common/base_controller";
import { ILogger } from "../logger/ILogger";
import { TYPES } from "../types";
import { IUserController } from "./interfaces/IUserCotroller";
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { IConfigService } from "../config/IConfigService";
import { UserRegisterDto } from "./dto/user-reg-dto";
import { IUserService } from "../services/interfaces/IUserService";

@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(
        @inject(TYPES.LoggerService) private loggerService: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.UserService) private userService: IUserService
    ) {
        super(loggerService)
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login,
            },
            {
                path: '/registration',
                method: 'post',
                func: this.register,
            },
            {
                path: '/activate/:link',
                method: 'get',
                func: this.activate,
            }
        ]);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {

    };
    async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = await this.userService.registrarion(body);
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
                });
            this.ok(res, { ...userData });
        } catch (e) {
            next(e);
        }
    };
    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {

    };
    async activate(req: Request, res: Response, next: NextFunction): Promise<void> {

    };

}