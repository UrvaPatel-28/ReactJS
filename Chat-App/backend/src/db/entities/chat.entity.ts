import { Optional } from "@nestjs/common";
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string

    // @Column()
    // date: Date

    @Column()
    userId: string

    @Column()
    username: string

    @Column()
    message: string

}