import express, { Express, Request, Response } from 'express';
import { config } from './config';
import { routes } from './routes';



const app : Express = express();
app.use(express.json());

//routes 
app.use('/', routes)
app.use('/items', routes)
app.use('/waddwayWebHook', routes)

app.get('/hi', (req: Request, res: Response) => {
    res.send('WHat iss good');
});

app.listen(config.BACK_HOST, () => {
    console.log(`Example app listening at http://localhost:${config.BACK_HOST}`);
});