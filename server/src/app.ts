import express, { Express, json } from "express";
import { Server } from 'http';
import { inject, injectable } from "inversify";
import { ILogger } from "./logger/ILogger";
import { TYPES } from "./types";
import 'reflect-metadata';
import { IErrorHandler } from "./errors/IErrorHandler";
import { PrismaService } from "./database/PrismaService";
import cookieParser from 'cookie-parser';
import { BaseController } from "./common/base_controller";


@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.LoggerService) private loggerService: ILogger,
        @inject(TYPES.ErrorHandler) private errorHandler: IErrorHandler,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.UserController) private userController: BaseController,
        @inject(TYPES.AccountController) private accountController: BaseController,
    ) {
        this.app = express();
        this.port = 5000;
    }

    useRoutes(): void {
        this.app.use(json());
        this.app.use(cookieParser());
        this.app.use('/users', this.userController.router);
        this.app.use('/accounts', this.accountController.router);
    }



    useErrorHandler(): void {
        this.app.use(this.errorHandler.catch.bind(this.errorHandler));
    }

    public async init() {
        this.useRoutes();
        this.useErrorHandler();
        await this.prismaService.connect();
        this.server = this.app.listen(this.port);
        this.loggerService.log(`Server is listened! [http://localhost:${this.port}]`)
    }
}