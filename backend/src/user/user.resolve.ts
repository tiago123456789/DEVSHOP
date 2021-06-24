import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { UserInputDto } from "./dto/user-input.dto";
import { UserUpdateInputDto } from "./dto/user-update-input.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(of => UserDto)
export class UserResolver {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    @Mutation(returns => Boolean)
    async updateUser(@Args("input") input: UserUpdateInputDto): Promise<Boolean> {
        const entity: User = new User();
        entity.name = input.name;
        entity.email = input.email;
        await this.userService.update(entity);
        return true;
    }


    @Mutation(returns => UserDto)
    async createUser(@Args("input") input: UserInputDto): Promise<UserDto> {
        const entity: User = new User();
        entity.name = input.name;
        entity.email = input.email;
        entity.password = input.password;
        return await this.userService.create(entity);
    }

    @Query(returns => [UserDto])
    public async getUsers(): Promise<UserDto[]> {
        const users = await this.userService.getAll();
        return users;
    }

    @Query(returns => AuthCredentialDto)
    public async authenticate(): Promise<AuthCredentialDto> {
        const authCredential = new AuthCredentialDto();
        authCredential.accessToken = this.jwtService.sign({
            type: "ACCESS",
            id: 1
        })
        authCredential.refreshToken = this.jwtService.sign({
            type: "REFRESH",
            id: 1
        })
        return authCredential;
    }

    
}