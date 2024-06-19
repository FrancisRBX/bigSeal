import express, { Express, Request, Response } from 'express';
import { testEndpoint } from './endpoints/test';


const app : Express = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/hi', (req: Request, res: Response) => {
    res.send('WHat iss good');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

export const routes = express.Router();

routes.use(testEndpoint);