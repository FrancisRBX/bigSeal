import express, { Request, Response } from 'express';
import { Router } from 'express';
import { WebHooks } from '../waddwayWebHooks';

export const waddwayRoute = Router();


waddwayRoute.route('/waddwayWebHook')
    .post((req: Request, res: Response) => {
        console.log("POSTING /waddwayWebHook");
        console.log(req.body);
        WebHooks.CommandChannel.sendMessage(req.body);
        res.status(201).json(req.body);
    });