import express, {Request, Response} from 'express';
import { testRoute } from './test';
import { waddwayRoute } from './waddwayRoute';

export const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('New main page?!');
})

routes.use(testRoute);
routes.use(waddwayRoute);

