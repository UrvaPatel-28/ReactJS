import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30 })
    userName: string;


    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: "varchar" })
    mobileNumber: number;

    @Column({ nullable: true })
    userProfile: string;


}



