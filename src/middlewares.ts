import { NextFunction, Request, Response } from "express";
import market from "./database";
import { Product } from "./interfaces";

const idExists = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const marketIndex: number = market.findIndex(
        (v: Product): boolean => v.id === Number(id)
    );

    if (marketIndex === -1) {
        return res.status(404).json({ message: "Product not found." });
    }

    res.locals = {
        ...res.locals,
        marketIndex
    };
    
    return next();
};

export default { idExists };