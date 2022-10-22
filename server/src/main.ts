import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ILogger } from "./logger/ILogger";
import { LoggerService } from "./logger/LoggerService";
import { TYPES } from "./types";
import 'reflect-metadata';
import { IErrorHandler } from "./errors/IErrorHandler";
import { ErrorHandler } from "./errors/ErrorHandler";
import { IConfigService } from "./config/IConfigService";
import { ConfigService } from "./config/ConfigService";
import { PrismaService } from "./database/PrismaService";

export interface IBootstrapReturn {
	appConteiner: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind:interfaces.Bind) => {
    bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
    bind<IErrorHandler>(TYPES.ErrorHandler).to(ErrorHandler);
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<App>(TYPES.Application).to(App);
});

function bootstrap(){
    const appConteiner= new Container();
    appConteiner.load(appBindings);
    const app = appConteiner.get<App>(TYPES.Application);
    app.init();
    return {app, appConteiner};
}

export const {app, appConteiner} = bootstrap();