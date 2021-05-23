import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryDto {

    @Field({ nullable: true })
    public id: string;

    @Field({ nullable: true })
    public name: string;

    @Field({ nullable: true })
    public slug: string;

    constructor(id: string | null, name: string, slug: string) {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }

}