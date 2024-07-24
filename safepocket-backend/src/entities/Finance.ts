import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Finance {
  @PrimaryGeneratedColumn()
  id!: number; // Use '!' para indicar que a propriedade será inicializada mais tarde

  @Column()
  amount!: number;

  @Column()
  description!: string;

  @Column()
  date!: Date;
}
