import express, {Request, Response} from 'express';
import { chatRoute } from './chats';
import { pdDeathRoute } from './pdDeath';

export const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('New main page?!');
});

routes.use(chatRoute);
routes.use(pdDeathRoute)

