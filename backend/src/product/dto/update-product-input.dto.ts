import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProductInputDto {

    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    name: String;

    @Field({ nullable: true })
    description: String;

    @Field({ nullable: true })
    slug: String;
}