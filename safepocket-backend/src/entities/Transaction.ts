import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

// Definindo o modelo Transaction com campos description, amount, e type
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column("decimal", { precision: 10, scale: 2 }) // Ajuste o tipo de coluna para decimal com precisão e escala
  amount: number;

  @Column({ type: "varchar", length: 50 }) // Adicionando o campo type
  type: string;

  @ManyToOne(() => User, user => user.transactions, { nullable: true })
  user: User | null;

  constructor(id?: number, description?: string, amount?: number, type?: string, user?: User) {
    this.id = id || 0;
    this.description = description || '';
    this.amount = amount || 0;
    this.type = type || ''; // Inicializando o campo type
    this.user = user || null;
  }
}
