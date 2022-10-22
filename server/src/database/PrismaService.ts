import { inject, injectable } from "inversify";
import { ILogger } from "../logger/ILogger";
import { TYPES } from "../types";
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';

@injectable()
export class PrismaService {
    client: PrismaClient;

	constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Connected successfully');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] Connection failed: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}