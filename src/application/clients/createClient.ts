import { Client } from "../../domain/entities/client";
import { ClientRepository } from "../../domain/repositories/clientRepository";
import { CreateClientDTO } from "../../interfaces/dtos/createClientDTO";



export class CreateClient {
  constructor(private clientRepo: ClientRepository) {}

  public async execute(createProductDTO: CreateClientDTO): Promise<Client> {
    const client = new Client();
    client.name = createProductDTO.name;
    client.email = createProductDTO.email;
    client.address = createProductDTO.address;
    await this.clientRepo.save(client);
    return client;
  }
}
