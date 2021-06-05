import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductInputDto {

    @Field({ nullable: true })
    id: String;

    @Field({ nullable: true })
    name: String;

    @Field({ nullable: true })
    description: String;

    @Field({ nullable: true })
    slug: String;
}