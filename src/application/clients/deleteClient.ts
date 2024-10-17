import { Client } from "../../domain/entities/client";
import { ClientRepository } from "../../domain/repositories/clientRepository";



export class DeleteClient {
  constructor(private clientRepo: ClientRepository) {}

  public async execute(id: number): Promise<Client | null> {
    const clientToUpdate = this.clientRepo.findById(id);
    if(!clientToUpdate){
        throw new Error(`Product with ID ${id} not found`);   
    }
    return this.clientRepo.delete(id);
  }
}