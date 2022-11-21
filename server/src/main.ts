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
import { IUserService } from "./services/interfaces/IUserService";
import { UserService } from "./services/UserService";
import { IUserController } from "./controllers/interfaces/IUserCotroller";
import { UserController } from "./controllers/UserController";
import { ITokenServie } from "./services/interfaces/ITokenService";
import { TokenService } from "./services/TokenService";
import { IUserRepository } from "./database/repository/interfaces/IUserRepository";
import { UserRepository } from "./database/repository/UserRepository";
import { IMailService } from "./services/interfaces/IMailService";
import { MailService } from "./services/MailService";
import { IAccountController } from "./controllers/interfaces/IAccountController";
import { AccountController } from "./controllers/AccountController";

export interface IBootstrapReturn {
	appConteiner: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind:interfaces.Bind) => {
    bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
    bind<IErrorHandler>(TYPES.ErrorHandler).to(ErrorHandler);
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<IUserService>(TYPES.UserService).to(UserService);
    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
    bind<IUserController>(TYPES.UserController).to(UserController);
    bind<ITokenServie>(TYPES.TokenService).to(TokenService).inSingletonScope();
    bind<IMailService>(TYPES.MailService).to(MailService).inSingletonScope();
    bind<IAccountController>(TYPES.AccountController).to(AccountController);
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