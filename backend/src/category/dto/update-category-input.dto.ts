import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCategoryInputDto {

    @Field({ nullable: true })
    public id: string;

    @Field({ nullable: true })
    public name: string;

    @Field({ nullable: true })
    public slug: string;

}