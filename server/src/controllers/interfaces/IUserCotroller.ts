import { NextFunction, Request, Response } from 'express';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	refresh: (req: Request, res: Response, next: NextFunction) => void;
	activate: (req: Request, res: Response, next: NextFunction) => void;
}