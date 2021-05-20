import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryDto {

    @Field({ nullable: true })
    public id: string;

    @Field({ nullable: true })
    public name: string;

}