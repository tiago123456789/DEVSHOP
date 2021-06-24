import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length, Matches } from "class-validator";

@InputType()
export class UserUpdateInputDto {

    @Field({ nullable: true })
    @Length(3)
    name: string;

    @Field({ nullable: true })
    @Length(3)
    @IsEmail()
    email: string;

}