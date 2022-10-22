import { IConfigService } from './IConfigService';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/ILogger';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerService) private loggerService: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.loggerService.error('[ConfigService] .env file is missing or corrupted [', result.error.message,']');
		} else {
			this.loggerService.log('[ConfigService] .env file is read successfully');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
