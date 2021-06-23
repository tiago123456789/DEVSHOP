import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {

    id: string;

    name: string;

    email: string;

    password: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}