import { inject, injectable } from "inversify";
import { IUserRepository } from "./interfaces/IUserRepository";
import 'reflect-metadata';
import { TYPES } from "../../types";
import { PrismaService } from "../PrismaService";
import { User } from "@prisma/client";
import { UserEntity } from "../../entities/User";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {

    }

    async create({ name, email, password, role, activationLink }: UserEntity): Promise<User> {
        return await this.prismaService.client.user.create({
            data: {
                Name: name,
                Email: email,
                Password: password,
                activationLink,
                role,
            },
        })
    };

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prismaService.client.user.findFirst({
            where: {
                Email: email,
            },
        });
    };

    async getAllUsers () : Promise<User[]>{
        return this.prismaService.client.user.findMany();
    };

    async delete (email: string) : Promise<void>{
        this.prismaService.client.user.delete({
            where:{
                Email:email,
            },
        });
    };
}