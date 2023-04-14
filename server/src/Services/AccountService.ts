import { Account } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IConfigService } from "../config/IConfigService";
import { AccountDto } from "../controllers/dto/AccountDto";
import { PrismaService } from "../database/PrismaService";
import { HttpError } from "../errors/HttpErrors";
import { TYPES } from "../types";
import 'reflect-metadata';
import { IAccountService } from "./interfaces/IAccountService";

@injectable()
export class AccountService implements IAccountService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
    ) { }
    async getAccountsByUserId(userId: number): Promise<Account[]> {
        let accounts = this.prismaService.client.account.findMany();
        return accounts;
    };
    async createAccount({ name, balance, userId, currencyId, iconId }: AccountDto): Promise<Account> {
        const isExist = await this.prismaService.client.account.findFirst({ where: { Name: name } });
        if (isExist) {
            throw new HttpError(400, `Аккаунт ${name} уже сущетсвует!`);
        }
        const account = await this.prismaService.client.account.create({ data: { Name: name, Balance: balance, userId:userId, iconId:iconId, currencyTypeId:currencyId }});

        return account;
    };
    // async updateAccount(dto: AccountDto): Promise<AccountDto> {

    // };
    // async deleteAccount(accountId: number): Promise<AccountDto | null> {

    // };



}