import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataInvalidException } from "src/commom/exceptions/data-invalid.exception";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>) {
    }

    private findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

    async update(register: User) {
        // @ts-ignore
        const registerWithEmail = await this.findByEmail(register.email);
        if (registerWithEmail && register.id != registerWithEmail.id) {
            throw new DataInvalidException("Email can't used! Used another email.")
        }
        return this.userRepository.update(register.id, {
            name: register.name,
            email: register.email
        })
    }

    async create(register: User) {
        // @ts-ignore
        const registerWithEmail = await this.findByEmail(register.email);
        if (registerWithEmail) {
            throw new DataInvalidException("Email can't used! Used another email.")
        }

        const entityCreated = await this.userRepository.save(register);
        // @ts-ignore
        return new UserDto(entityCreated.id, entityCreated.name, entityCreated.email);
    }

    async getAll(): Promise<UserDto[]> {
        const register = await this.userRepository.find({});
        return register.map((item: User) => {
            // @ts-ignore
            return new UserDto(item.id, item.name, item.email);
        })
    }
}