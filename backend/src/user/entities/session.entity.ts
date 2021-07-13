import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 1000 })
    userAgent: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    isActive: Boolean = true;

    @Column({ type: "text", name: "refresh_token" })
    refreshToken: string;

    @Column({ type: "timestamp" })
    updatedAt: Date

    @BeforeInsert()
    setCreatedAtOrUpdatedAt() {
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}