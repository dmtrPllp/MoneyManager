import { Role } from "@prisma/client";
import { hash } from "bcrypt";

export class UserEntity {
    private _password: string;

    constructor(private readonly _email: string,
        private readonly _name: string,
        private readonly _activationLink: string,
        private readonly _role?: Role,
    ) {

    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name
    }

    public async setPassword(pass: string, salt: string): Promise<void> {
        this._password = await hash(pass, Number(salt));
    }
    get password(): string {
        return this._password;
    }

    get role() {
        return this._role;
    }
    get activationLink() {
        return this._activationLink;
    }
}