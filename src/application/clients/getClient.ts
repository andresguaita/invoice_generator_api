import { Client } from "../../domain/entities/client";
import { ClientRepository } from "../../domain/repositories/clientRepository";

export class GetClient {
  constructor(private clientRepo: ClientRepository) {}

  public async execute(id: number): Promise<Client | null> {
    return this.clientRepo.findById(id);
  }
}