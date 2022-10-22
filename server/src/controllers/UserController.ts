import { inject, injectable } from "inversify";
import { BaseController } from "../common/base_controller";
import { ILogger } from "../logger/ILogger";
import { TYPES } from "../types";
import { IUserController } from "./interfaces/IUserCotroller";
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { IConfigService } from "../config/IConfigService";

@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(
        @inject(TYPES.LoggerService) private loggerService: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) {
        super(loggerService)
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login,
            },
            {
                path: '/register',
                method: 'post',
                func: this.register,
            },
            {
                path: '/auth',
                method: 'get',
                func: this.check,
            }
        ]);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {

    };
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {

    };
    async check(req: Request, res: Response, next: NextFunction): Promise<void> {

    };

}