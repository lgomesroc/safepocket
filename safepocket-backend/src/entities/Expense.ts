import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description?: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number = 0;

  @ManyToOne(() => User, (user) => user.expenses)
  user!: User;
}
