import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CategoryInputDto {

    @Field({ nullable: true })
    public name: string;

    @Field({ nullable: true })
    public slug: string;

}