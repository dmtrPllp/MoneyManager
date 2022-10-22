import { NextFunction, Request, Response } from "express";

export interface IErrorHandler{
    catch: (err:Error,req:Request,res: Response,next: NextFunction) => void;
}