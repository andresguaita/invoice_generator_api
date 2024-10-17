import { ClientRepository } from "../../domain/repositories/clientRepository";


export class ListClients {
  constructor(private clientRepo: ClientRepository) {}

  public async execute(page: number, limit: number): Promise<{ clients: any[], total: number, totalPages: number }> {
    const { clients, total } = await this.clientRepo.listPaginated(page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      clients,
      total,
      totalPages
    };
  }
}
