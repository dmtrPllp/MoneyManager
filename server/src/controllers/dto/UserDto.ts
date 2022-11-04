import { User } from "@prisma/client";

export class UserDto{
    id: number;
	email: string;
    isActivated: boolean;
	name: string;
    constructor(model:User){
		this.id=model.Id;
		this.name=model.Name;
		this.email=model.Email;
		this.isActivated=model.isActivated;
	}
}