import { User } from '@prisma/client';
import { UserEntity } from '../../../entities/User';


export interface IUserRepository {
	create: (user: UserEntity) => Promise<User>;
	getUserByEmail: (email: string) => Promise<User | null>;
	delete: (email: string) => Promise<void>;
    getAllUsers:() => Promise<User[]>;
    // updateUser:(oldUser:UserEntity, )
}
