import { Field, ObjectType } from "@nestjs/graphql";
import { Length } from "class-validator";

@ObjectType()
export class AuthCredentialDto {

    @Field({ nullable: true })
    accessToken: string
    
    @Field({ nullable: true })
    refreshToken: string
}