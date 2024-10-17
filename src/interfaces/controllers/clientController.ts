import { Request, Response } from 'express';
import { CreateClient } from '../../application/clients/createClient';
import { ClientRepositoryImpl } from '../../infrastructure/repositories/clientRepositoryImpl';
import { UpdateClient } from '../../application/clients/updateClient';
import { DeleteClient } from '../../application/clients/deleteClient';
import { GetClient } from '../../application/clients/getClient';
import { ListClients } from '../../application/clients/listClients';




export class ClientController {
    private createClientUseCase: CreateClient;
    private updateClientUseCase: UpdateClient;
    private deleteClientUseCase: DeleteClient;
    private getClientUseCase: GetClient;
    private listClientUseCase: ListClients;
    constructor() {
        const clientRepository = new ClientRepositoryImpl();
        this.createClientUseCase = new CreateClient(clientRepository);
        this.updateClientUseCase = new UpdateClient(clientRepository);
        this.deleteClientUseCase = new DeleteClient(clientRepository)
        this.getClientUseCase = new GetClient(clientRepository);
        this.listClientUseCase = new ListClients(clientRepository)
    }


    public async createClient(req: Request, res: Response): Promise<void> {
        try {
            const clientDto = req.body;
            const client = await this.createClientUseCase.execute(clientDto);
            res.status(201).json(client);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error creating client', error: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }

    public async updateClient(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const product = req.body;
        const updatedProduct = await this.updateClientUseCase.execute(id, product);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    }

    public async deleteClient(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const deletedClient = await this.deleteClientUseCase.execute(id);
        if (deletedClient) {
            res.status(200).json(deletedClient);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }

    public async getClient(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const product = await this.getClientUseCase.execute(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    }

    public async listPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;

            const result = await this.listClientUseCase.execute(page, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error listing clients', error: (error as Error).message });
        }
    }


}
