import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product {

    @Field({ nullable: true })
    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Field({ nullable: true })
    @Column({ length: 250, nullable: true })
    name: String;

    @Field({ nullable: true })
    @Column({ length: 1000, nullable: true })
    description: String;

    @Field({ nullable: true })
    @Column({ length: 250, nullable: true })
    slug: String;
}