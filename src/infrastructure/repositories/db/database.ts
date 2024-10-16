import { DataSource } from 'typeorm';
import { Product } from '../../../domain/entities/product';
import { Invoice } from '../../../domain/entities/invoice';
import { Client } from '../../../domain/entities/client';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'invoices_db',
  entities: [Client,Invoice,Product],
  migrations: ['dist/migrations/*.js'],
  synchronize: true, // Cambiar a true solo en desarrollo
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
