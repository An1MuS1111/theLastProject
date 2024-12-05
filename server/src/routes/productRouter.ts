import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import { Product } from "../models/Product";

const router = Router();

// get all the products with optional search
router.get("/", async (req: Request, res: Response) => {
    const { search } = req.query;

    try {
        const searchFilter = search
            ? {
                  [Op.or]: [
                      { name: { [Op.like]: `%${search}%` } },
                      { description: { [Op.like]: `%${search}%` } },
                  ],
              }
            : {};

        const products = await Product.findAll({
            where: searchFilter,
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error,
        });
    }
});

// get product by primary key
router.post("/:id", async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        product
            ? res.json(product)
            : res.status(404).json({ message: "Product not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
});

// add product
router.post("/add", async (req: Request, res: Response) => {
    const {
        name,
        description,
        stock,
        category_id,
        subCategory_id,
        price,
        images,
    } = req.body;

    try {
        const product = await Product.create({
            name,
            description,
            stock,
            category_id,
            subCategory_id,
            price,
            images,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
});

// Update product
router.put("/:id", async (req: Request, res: Response) => {
    const {
        name,
        description,
        stock,
        category_id,
        subCategory_id,
        price,
        images,
    } = req.body;

    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.update({
                name,
                description,
                stock,
                category_id,
                subCategory_id,
                price,
                images,
            });
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
});

// Delete a user by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

export default router;
