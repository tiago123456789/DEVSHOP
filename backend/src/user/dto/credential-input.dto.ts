import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length, Matches } from "class-validator";

@InputType()
export class CredentialInputDto {

    @Field({ nullable: false })
    @IsEmail()
    email: string;

    @Field({ nullable: false })
    @Length(10)
    @Matches(/([a-z]){1,}/, { message: "The password need have one letter in lowercase" })
    @Matches(/([A-Z]){1,}/, { message: "The password need have one letter in uppercase"})
    @Matches(/([0-9]){1,}/, { message: "The password need have one number"})
    @Matches(/([@#$%&*!]){1,}/, { message: "The password need have one special character"})
    password: string;
}