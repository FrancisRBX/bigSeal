import { Request, Response } from 'express';
import { Router } from 'express';
import { WebHooks } from '../WebHooks';

export const pdRouteStart = Router();

pdRouteStart.route('/api/pd_start')
    .post((req: Request, res: Response) => {
        console.log(req.body);
        const chat = req.body;
        WebHooks.PDLogsChannel.logPDStart(req.body);
        res.status(201).json(chat);
    });