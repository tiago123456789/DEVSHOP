import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class ProductInputDto {

    @Field({ nullable: true })
    id: String;

    @Length(3)
    @Field({ nullable: true })
    name: String;

    @Length(3)
    @Field({ nullable: true })
    description: String;

    @Length(3)
    @Field({ nullable: true })
    slug: String;
}