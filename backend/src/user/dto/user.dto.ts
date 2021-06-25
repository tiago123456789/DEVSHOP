import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {

    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    role: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    password: string;

    constructor(id: string, name: string, email: string, role: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}