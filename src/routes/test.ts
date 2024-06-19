import express, { Request, Response } from 'express';
import { Router } from 'express';

export const testRoute = Router();

interface Item {
    id: number;
    name: string;
}

const items: Item[] = [];

testRoute.route('/items')
    .get((req: Request, res: Response) => {
        console.log("GETTING /items");

        res.json(items);
    })
    .post((req: Request, res: Response) => {
        console.log("POSTING /items");
        console.log(req.body);
        const item: Item = req.body;
        items.push(item);
        res.status(201).json(item);
    });
    

