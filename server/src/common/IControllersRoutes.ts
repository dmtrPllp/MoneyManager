import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "../middleware/IMiddleware";

export interface IControllerRoutes {
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'>;
    path: string;
    func:(req:Request,res:Response,next:NextFunction)=> void;
    middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
