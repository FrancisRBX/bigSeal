import { Request, Response } from 'express';
import { Router } from 'express';
import { WebHooks } from '../WebHooks';

export const pdRouteEnd = Router();

pdRouteEnd.route('/api/pd_end')
    .post((req: Request, res: Response) => {
        console.log(req.body);
        const chat = req.body;
        WebHooks.PDLogsChannel.logPDEnd(req.body);
        res.status(201).json(chat);
    });