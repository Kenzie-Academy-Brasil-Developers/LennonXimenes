import { Request, Response } from "express";
import market from "./database";
import { Product } from "./interfaces";

const read = (req: Request, res: Response): Response => {
    return res.status(200).json({ total: market.length, market });
}

const retrieve = (req: Request, res: Response): Response => {

    const foundProd: Product | undefined = market.find(
        (p: Product): boolean => p.id === Number(req.params.id)
    );

    if (!foundProd) {
        return res.status(404).json({ error: "Product not found." });

    }
    return res.status(200).json(foundProd);
}

const create = (req: Request, res: Response): Response => {

    const newProduct: Product = {
        ...req.body,
        id: market.length + 1,
        expirationDate: new Date(),
    };

    market.push(newProduct);

    return res.status(201).json(newProduct);
}

const destroy = (req: Request, res: Response): Response => {
    
    return res.status(204).json();
}


export default { create, read, retrieve };