import { Field, InputType } from "@nestjs/graphql";
import { Length, IsUUID } from "class-validator";

@InputType()
export class UpdateCategoryInputDto {

    @IsUUID("4")
    @Field({ nullable: true })
    public id: string;

    @Length(3)
    @Field({ nullable: true })
    public name: string;

    @Length(3)
    @Field({ nullable: true })
    public slug: string;

}