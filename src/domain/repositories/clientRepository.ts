import { Client } from '../entities/client';

export interface ClientRepository {
  save(client: Client): Promise<Client>;
  update(id:number,client: Client): Promise<Client>;
  delete(id:number): Promise<Client>;
  findById(id: number): Promise<Client | null>;
  listPaginated(page: number, limit: number): Promise<{ clients: Client[], total: number }>;
}
