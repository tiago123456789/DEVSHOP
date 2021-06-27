import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { DataInvalidException } from "src/commom/exceptions/data-invalid.exception";
import { UnauthenticatedException } from "src/commom/exceptions/unauthenticated.exception";
import { EncryptUtil } from "src/commom/utils/encrypt.util";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { CredentialInputDto } from "./dto/credential-input.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private encryptUtil: EncryptUtil,
        private jwtService: JwtService
    ) {
    }

    async findById(id: string): Promise<UserDto> {
        const register = await this.userRepository.findOne(id);
        // @ts-ignore
        return new UserDto(register.id, register.name, register.email, register.role);
    }

    private findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

    async refreshAccessAndRefreshToken(refreshToken: string): Promise<AuthCredentialDto> {
        const tokenDecoded: any = this.jwtService.decode(refreshToken);
        if (!tokenDecoded || tokenDecoded.type != "REFRESH") {
            throw new UnauthenticatedException("It's not valid token")
        }
        const user = await this.userRepository.findOne(tokenDecoded.id);
        if (!user) {
            throw new UnauthenticatedException("It's not valid token")
        }

        await this.userRepository.update({ id: user.id }, { lastLogin: new Date() })
        return this.generateAccessAndRefreshToken(user);
    }

    async authenticate(credential: CredentialInputDto): Promise<AuthCredentialDto> {
        const registerWithEmail: User = await this.userRepository.findOne({
            where: { email: credential.email }
        });

        if (!registerWithEmail) {
            throw new UnauthenticatedException("Email or password is invalid.")
        }

        const isValidPassword: boolean = await this.encryptUtil
            .compare(credential.password, registerWithEmail.password);
        if (!isValidPassword) {
            throw new UnauthenticatedException("Email or password is invalid.")
        }

        await this.userRepository.update({ id: registerWithEmail.id }, { lastLogin: new Date() })
        return this.generateAccessAndRefreshToken(registerWithEmail);
    }

    private generateAccessAndRefreshToken(user: User) {
        const authCredential = new AuthCredentialDto();
        authCredential.accessToken = this.jwtService.sign({
            type: "ACCESS",
            email: user.email,
            role: user.role,
            id: user.id
        }, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXP })
        authCredential.refreshToken = this.jwtService.sign({
            type: "REFRESH",
            email: user.email,
            role: user.role,
            id: user.id
        }, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXP })
        return authCredential;
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
        return new UserDto(entityCreated.id, entityCreated.name, entityCreated.email, entityCreated.role);
    }

    async getAll(): Promise<UserDto[]> {
        const register = await this.userRepository.find({});
        return register.map((item: User) => {
            // @ts-ignore
            return new UserDto(item.id, item.name, item.email, item.role);
        })
    }
}