import express,{ Express } from "express";
import { Server } from 'http';
import { inject, injectable } from "inversify";
import { ILogger } from "./logger/ILogger";
import { TYPES } from "./types";
import 'reflect-metadata';
import { IErrorHandler } from "./errors/IErrorHandler";
import { PrismaService } from "./database/PrismaService";

@injectable()
export class App{
    app: Express;
    server: Server;
    port: number;
    
    constructor(
        @inject(TYPES.LoggerService) private loggerService : ILogger,
        @inject(TYPES.ErrorHandler) private errorHandler: IErrorHandler,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
    ) {
        this.app= express();
        this.port = 5000;
    }

    useRoutes(){

    }

    useErrorHandler(){  
        this.app.use(this.errorHandler.catch.bind(this.errorHandler));
    }

    public async init(){
        this.useErrorHandler();
        await this.prismaService.connect();
        this.server = this.app.listen(this.port);
        this.loggerService.log(`Server is listened! [http://localhost:${this.port}]`)
    }
}