import { NextFunction, Request, Response } from 'express';

export interface IAccountController {
    userAccounts: (req: Request, res: Response, next: NextFunction) => void;
    //editAccount: (req: Request, res: Response, next: NextFunction) => void;
    //deleteAccount: (req: Request, res: Response, next: NextFunction) => void;
}