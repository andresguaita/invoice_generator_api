import { DataSource } from 'typeorm';
import { Client } from '../../domain/entities/client';
import { Invoice } from '../../domain/entities/invoice';
import { Product } from '../../domain/entities/product';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'invoices_db',
  entities: [Client,Invoice,Product],
  synchronize: true, // Cambiar a true solo en desarrollo
  logging: true,
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1); // Salir si la conexión falla
  }
};
