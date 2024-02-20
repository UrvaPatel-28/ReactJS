import { Optional } from "@nestjs/common";
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Log {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: Date

    @Column({ nullable: true })
    userId: string

    @Column({ nullable: true })
    responseTime: number

    @Column()
    statusCode: number

    @Column()
    path: string

    @Column({ nullable: true })
    data: string
}