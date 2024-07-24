import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    amount: number;

    @ManyToOne(() => User, user => user.transactions)
    user: User | null;

    constructor(id?: number, description?: string, amount?: number, user?: User) {
        this.id = id || 0;
        this.description = description || '';
        this.amount = amount || 0;
        this.user = user || null;
    }
}
