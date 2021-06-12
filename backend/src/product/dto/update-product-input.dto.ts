import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class UpdateProductInputDto {

    @Field({ nullable: true })
    id: string;

    @Length(3)
    @Field({ nullable: true })
    name: String;

    @Length(20)
    @Field({ nullable: true })
    description: String;

    @Length(3)
    @Field({ nullable: true })
    slug: String;
}