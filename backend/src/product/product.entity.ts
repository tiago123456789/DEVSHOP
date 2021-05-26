import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Column({ length: 250, nullable: true })
    name: String;

    @Column({ length: 1000, nullable: true })
    description: String;

    @Column({ length: 250, nullable: true })
    slug: String;
}