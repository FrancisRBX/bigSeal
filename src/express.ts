import express, { Express, NextFunction, Request, Response } from 'express';
import { config } from './config';
import { routes } from './routes';

const app: Express = express();
app.use(express.json());

//Auth middlleware
app.use((req: Request, res: Response, next: NextFunction) => {
    const secret = req.headers['bot-secret'];
    if (secret !== config.BOT_SECRET) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    next();
});

//routes 
app.use('/', routes)

app.listen(config.BACK_PORT, "127.0.0.1", () => {
    console.log(`Example app listening at http://localhost:${config.BACK_PORT}`);
});

// BACK_PORT -> 5001