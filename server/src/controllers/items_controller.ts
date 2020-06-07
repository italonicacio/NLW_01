import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response:Response) {

        const items = await knex('items').select('*');
    
        const serialized_items = items.map(item => { 
            return {
                id: item.id,
                title: item.title,
                // image_url: `http://localhost:3333/uploads/${item.image}`
                image_url: `http://192.168.0.115:3333/uploads/${item.image}`

            };
        });
    
        return response.json(serialized_items);
    }
}

export default ItemsController;