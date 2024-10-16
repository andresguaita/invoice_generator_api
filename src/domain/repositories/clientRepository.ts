import { Client } from '../entities/client';

export interface ClientRepository {
  save(client: Client): Promise<Client>;
  findById(id: number): Promise<Client | null>;
}
