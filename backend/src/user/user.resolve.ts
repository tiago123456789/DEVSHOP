import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { UserAuthenticatedDecorator } from "src/commom/decorators/user-authenticated.decoretor";
import { AuthorizationGuard } from "src/commom/security/authorization.security";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { CredentialInputDto } from "./dto/credential-input.dto";
import { UserInputDto } from "./dto/user-input.dto";
import { UserUpdateInputDto } from "./dto/user-update-input.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(of => UserDto)
export class UserResolver {

    constructor(
        private userService: UserService,
    ) {}

    @Mutation(returns => Boolean)
    async updateUser(@Args("input") input: UserUpdateInputDto): Promise<Boolean> {
        const entity: User = new User();
        entity.name = input.name;
        entity.id = input.id
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
        entity.role = input.role
        return await this.userService.create(entity);
    }

    @Query(returns => [UserDto])
    public async getUsers(): Promise<UserDto[]> {
        const users = await this.userService.getAll();
        return users;
    }

    @Query(returns => AuthCredentialDto)
    public async authenticate(@Args("input") input: CredentialInputDto): Promise<AuthCredentialDto> {
        const authCredential = await this.userService.authenticate(input);
        return authCredential;
    }


    @UseGuards(AuthorizationGuard)
    @Query(returns => AuthCredentialDto)
    public async refreshAccessAndRefreshToken(@UserAuthenticatedDecorator() userId: string, @Args("refreshToken") input: string): Promise<AuthCredentialDto> {
        console.log(userId);
        const authCredential = await this.userService.refreshAccessAndRefreshToken(input);
        return authCredential;
    }


    @UseGuards(AuthorizationGuard)
    @Query(returns => UserDto)
    public async getMe(@UserAuthenticatedDecorator() userId: string): Promise<UserDto> {
        return await this.userService.findById(userId);
    }



    
}