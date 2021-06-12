import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class CategoryInputDto {

    @Length(3)
    @Field({ nullable: true })
    public name: string;

    @Length(3)
    @Field({ nullable: true })
    public slug: string;

}