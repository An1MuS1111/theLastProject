import { Router, Request, Response } from "express";
import { ProductCategory } from "../models/Product";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const productCategories = await ProductCategory.findAll();
        res.json(productCategories);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching productCategories",
            error,
        });
    }
});

export default router;
