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
import { UserLoginDto } from "./dto/user-login-dto";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware";
import { UpdateUserDto } from "./dto/update-user.tso";

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
                middlewares: [new ValidateMiddleware(UserLoginDto)]
            },
            {
                path: '/registration',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)]
            },
            {
                path: '/activate/:link',
                method: 'get',
                func: this.activate,
            },
            {
                path: '/refresh',
                method: 'get',
                func: this.refresh,
            },
            {
                path: '/update/:id',
                method: 'patch',
                func: this.update,
            }
        ]);
    }

    async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = await this.userService.login(body);
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
    async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(A.b);
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
        try {
            const refreshToken = req.cookies['refreshToken'];
            const token = await this.userService.refresh(refreshToken!);
            if (token) {
                res.cookie(
                    'refreshToken',
                    token.refreshToken,
                    {
                        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
                    });
                this.ok(res, { ...token });
            }
        } catch (e) {
            next(e);
        }
    };
    async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const activationLink = req.params.link;
            await this.userService.activate(activationLink);
            return res.redirect(this.configService.get('CLIENT_URL'));
        } catch (e) {
            next(e);
        }
    };

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const updateDto: UpdateUserDto = req.body;
            await this.userService.update(+id, updateDto);
            return res.redirect(this.configService.get('CLIENT_URL'));
        } catch (e) {
            next(e);
        }
    };

}

enum A {
    a,
    b,
    c
}