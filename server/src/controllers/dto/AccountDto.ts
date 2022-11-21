import { Account } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class AccountDto {
    id: number;
    name: string;
    balance: Decimal;
    userId: number;
    currencyId: number;
    iconId: number;
    constructor(model: Account) {
        this.id = model.Id;
        this.name = model.Name;
        this.balance = model.Balance;
        this.userId = model.userId;
        this.currencyId = model.currencyTypeId;
        this.iconId = model.iconId;
    }
}