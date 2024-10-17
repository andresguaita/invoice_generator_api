
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

  
  async update(id: number, client: Client): Promise<Client> {
    await this.ormRepo.update(id, client);
    const updatedClient = <Client>await this.ormRepo.findOne({ where: { id } });
    return updatedClient;
  }

  async delete(id: number): Promise<Client> {
    await this.ormRepo.update(id, { isDeleted: true });
    const updatedClient = <Client>await this.ormRepo.findOne({ where: { id } });
    return updatedClient;
  }

  async listPaginated(page: number, limit: number): Promise<{ clients: Client[], total: number }> {
    const [clients, total] = await  this.ormRepo
      .findAndCount({
        take: limit, 
        skip: (page - 1) * limit,
      });
    return { clients, total };
  }
}
