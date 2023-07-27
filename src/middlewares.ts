import { NextFunction, Request, Response } from "express";
import market from "./database";
import { Product } from "./interfaces";

const requestLog = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method}: ${req.url}`);

    return next();
}

const idExists = (req: Request, res: Response, next: NextFunction): void | Response => {

    const { id } = req.params;
    const marketIndex: number = market.findIndex(
        (v: Product): boolean => v.id === Number(id)
    );

    if (marketIndex === -1) {
        return res.status(404).json({ message: "Product not found." });
    }

    const foundProduct = market[marketIndex]

    res.locals = { ...res.locals, marketIndex, foundProduct };

    return next();
};

const nameExists = (req: Request, res: Response, next: NextFunction): void | Response => {

    const { name } = req.body;

    if (!name) return next();

    const foundProductName: Product | undefined = market.find((p: Product): boolean => p.name === name);

    if (foundProductName) {
        return res.status(409).json({ message: "Product already registered." });
    }

    return next();
}


export default { requestLog, idExists, nameExists };