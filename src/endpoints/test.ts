import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

export const testEndpoint = Router();

interface Item {
    id: number;
    name: string;
}

const items: Item[] = [];


testEndpoint.get('/items', (req: Request, res: Response) => {
    console.log("GETTING /items");

    res.json(items);
});

testEndpoint.post('/items', (req: Request, res: Response) => {
    const item: Item = req.body;
    items.push(item);
    res.status(201).json(item);
});

//https://dev.to/sulistef/how-to-set-up-routing-in-an-expressjs-project-using-typescript-51ib


