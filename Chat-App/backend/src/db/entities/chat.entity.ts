import { Optional } from "@nestjs/common";
import { Column, CreateDateColumn, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    date: Date

    @Column()
    senderName: string

    @Column()
    senderId: string


    @Column()
    receiverId: string

    @Column()
    message: string

}