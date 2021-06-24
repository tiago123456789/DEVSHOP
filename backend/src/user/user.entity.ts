import { EncryptUtil } from "src/commom/utils/encrypt.util";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: String;

    @Column()
    email: String;

    @Column()
    password: string;

    @Column({ type: "timestamp" })
    lastLogin: Date

    @Column({ type: "timestamp" })
    createdAt: Date

    @Column({ type: "timestamp" })
    updatedAt: Date

    @BeforeInsert()
    async applyHashInPassword() {
        this.password = await new EncryptUtil().encode(this.password);
    }

    @BeforeInsert()
    setCreatedAtOrUpdatedAt() {
        this.updatedAt = new Date();
        this.createdAt = new Date();
        this.lastLogin = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}