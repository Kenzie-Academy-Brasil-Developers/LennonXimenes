import { Request, Response } from "express";
import market from "./database";
import { Product } from "./interfaces";

const getNextId = (): number => {
    const lastProduct: Product | undefined = market.sort(
        (a: Product, b: Product): number => a.id - b.id)
        .at(-1);

    if (!lastProduct) return 1;

    return lastProduct.id + 1;
}

const read = (req: Request, res: Response): Response => {
    const amount: number = market.reduce(
        (a: number, b: Product): number => a + b.price, 0)

    return res.status(200).json({ total: amount, products: market });
}

const retrieve = (req: Request, res: Response): Response => {

    const { foundProduct } = res.locals;

    return res.status(200).json(foundProduct);
}

const create = (req: Request, res: Response): Response => {

    const newProduct: Product = {
        ...req.body,
        id: getNextId(),
        expirationDate: new Date()
    };

    newProduct.expirationDate.setFullYear(newProduct.expirationDate.getFullYear() + 1);

    market.push(newProduct);

    return res.status(201).json(newProduct);
}

const partialUpdate = (req: Request, res: Response): Response => {

    const { marketIndex } = res.locals;

    const updateProduct = (market[marketIndex] = {
        ...market[marketIndex],
        ...req.body
    });

    return res.status(200).json(updateProduct);
}

const destroy = (req: Request, res: Response): Response => {

    const { marketIndex } = res.locals;

    market.splice(marketIndex, 1);

    return res.status(204).json();
}


export default { read, retrieve, create, partialUpdate, destroy };