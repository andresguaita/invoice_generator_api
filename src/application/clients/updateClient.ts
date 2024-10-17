import { Client } from "../../domain/entities/client";
import { ClientRepository } from "../../domain/repositories/clientRepository";



export class UpdateClient {
  constructor(private clientRepo: ClientRepository) {}

  public async execute(id: number, client: Client): Promise<Client | null> {
    const clientToUpdate = this.clientRepo.findById(id);
    if(!clientToUpdate){
        throw new Error(`Product with ID ${id} not found`);   
    }
    return this.clientRepo.update(id, client);
  }
}
