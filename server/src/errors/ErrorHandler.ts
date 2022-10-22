import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IErrorHandler } from "./IErrorHandler";
import 'reflect-metadata';
import { TYPES } from "../types";
import { ILogger } from "../logger/ILogger";
import { HttpError } from "./HttpErrors";

@injectable()
export class ErrorHandler implements IErrorHandler {
    constructor(
        @inject(TYPES.LoggerService) private loggerService: ILogger
    ) {

    }

    catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
        if (err instanceof HttpError) {
            this.loggerService.error(`[${err.context}]  Ошибка ${err.statusCode}: ${err.message} `);
            res.status(err.statusCode).send({ err: err.message });
        } else {
            this.loggerService.error(`${err.message}`);
            res.status(500).send({ err: err.message });
        }

    };

}