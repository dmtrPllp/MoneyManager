import { inject, injectable } from "inversify";
import { BaseController } from "../common/base_controller";
import 'reflect-metadata';
import { TYPES } from "../types";
import { IConfigService } from "../config/IConfigService";
import { ILogger } from "../logger/ILogger";
import { IAccountController } from "./interfaces/IAccountController";
import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { AccountDto } from "./dto/AccountDto";
import { IAccountService } from "../services/interfaces/IAccountService";


@injectable()
export class AccountController extends BaseController implements IAccountController {


    constructor(@inject(TYPES.LoggerService) private loggerService: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.AccountService) private accountService: IAccountService,) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/accountByUserId/:id',
                method: 'get',
                func: this.userAccounts,
                middlewares: [new AuthMiddleware()]
            },
            {
                path: '/add',
                method: 'post',
                func: this.createAccount,
                middlewares: [new AuthMiddleware()]
            },
            {
                path: '/edit',
                method: 'put',
                func: this.editAccount,
                middlewares: [new AuthMiddleware()]
            },
            {
                path: '/delete/:id',
                method: 'get',
                func: this.deleteAccount,
                middlewares: [new AuthMiddleware()]
            },
        ]);
    }
    async userAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        } catch (e) {
            next(e);
        }
    };
    async createAccount({ body }: Request<{}, {}, AccountDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const added = await this.accountService.createAccount(body);
            this.ok(res, { ...added });
        } catch (e) {
            next(e);
        }
    };
    async editAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        } catch (e) {
            next(e);
        }
    };
    async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        } catch (e) {
            next(e);
        }
    };
}