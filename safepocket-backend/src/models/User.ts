import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ type: "varchar", length: 200 })
    email: string = '';

    @Column({ type: "varchar", length: 200 })
    password: string = '';
}
