import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Invoice } from './invoice';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Invoice, invoice => invoice.client)
  invoices: Invoice[];
}
