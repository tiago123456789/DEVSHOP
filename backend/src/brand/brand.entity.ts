import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Brand {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: String;

    @Column({ nullable: true })
    image: String;
}