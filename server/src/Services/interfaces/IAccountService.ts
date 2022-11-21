import { Account } from "@prisma/client";
import { AccountDto } from "../../controllers/dto/AccountDto";


export interface IAccountService {
    getAccountsByUserId: (userId:number ) => Promise<Account[]>;
    createAccount: (dto: AccountDto) => Promise<Account>;
    //updateAccount: (dto: AccountDto) => Promise<AccountDto>;
    //deleteAccount: (accountId:number) => Promise<AccountDto | null>;
    // logout: (refreshToken: string) => Promise<boolean>;
}