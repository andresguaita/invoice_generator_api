
import { Client } from '../../domain/entities/client';
import { ClientRepository } from '../../domain/repositories/clientRepository';
import { AppDataSource } from './db/database';

export class ClientRepositoryImpl implements ClientRepository {
  private ormRepo = AppDataSource.getRepository(Client);

  async save(client: Client): Promise<Client> {
    return this.ormRepo.save(client);
  }

  async findById(id: number): Promise<Client | null> {
    return this.ormRepo.findOne({ where: { id } }) || null;
  }
}
