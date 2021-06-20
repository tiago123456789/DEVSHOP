import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class BrandInputDto {
    
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    name: String;

    @Field({ nullable: true })
    image: String;

    constructor(id: string | null, name: string, image: string) {
        this.id = id;
        this.name = name;
        this.image = name
    }
}