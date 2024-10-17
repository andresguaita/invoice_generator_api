import { DataSource } from 'typeorm';
import { Product } from '../../../domain/entities/product';
import { Invoice } from '../../../domain/entities/invoice';
import { Client } from '../../../domain/entities/client';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.DB_NAME || 'invoices_db',
  entities: [Client,Invoice,Product],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.NODE_ENV === 'prod'? false : true,
  logging: false,
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
};
