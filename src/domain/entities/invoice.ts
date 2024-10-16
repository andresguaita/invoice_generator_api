import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column } from 'typeorm';
import { Client } from './client';
import { Product } from './product';

@Entity()
export class Invoice {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, client => client.invoices, { nullable: false })
  client: Client;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column('decimal')
  totalAmount: number;

  @Column('decimal')
  tax: number;

  @Column('date')
  date: string;

  @Column({ default: false })
  isDeleted: boolean;  
}
