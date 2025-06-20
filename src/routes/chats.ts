import { Request, Response } from 'express';
import { Router } from 'express';
import { WebHooks } from '../WebHooks';

export const chatRoute = Router();

export interface Chat {
    playerName: string;
    message: string;
}

chatRoute.route('/player_chatted')
    .post((req: Request, res: Response) => {
        console.log(req.body);
        const chat: Chat = req.body;
        WebHooks.LogsChannel.sendMessage(req.body);
        res.status(201).json(chat);
    });