import express, {Request, Response} from 'express';
import { chatRoute } from './chats';
import { pdDeathRoute } from './pdDeath';
import { pdRouteStart } from './pdStart';
import { pdRouteEnd } from './pdEnd';

export const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('New main page?!');
});

routes.use(chatRoute);
routes.use(pdDeathRoute);
routes.use(pdRouteStart);
routes.use(pdRouteEnd);

