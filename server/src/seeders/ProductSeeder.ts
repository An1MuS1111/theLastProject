import { faker } from "@faker-js/faker";
import { Product } from "../models/Product"; // Adjust the path as needed

export const ProductSeeder = async () => {
    try {
        // Generate an array of 50 products
        const products = Array.from({ length: 50 }).map(() => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            stock: faker.number.int({ min: 0, max: 100 }), // Random stock quantity
            category_id: faker.number.int({ min: 1, max: 10 }), // Replace with valid category IDs
            subCategory_id: faker.number.int({ min: 1, max: 20 }), // Replace with valid subcategory IDs
            price: parseFloat(faker.commerce.price({ min: 10, max: 100000 })), // Random price between 10 and 1000
            images: Array.from({
                length: faker.number.int({ min: 1, max: 5 }),
            }).map(() => faker.image.avatar()),
        }));

        // Use Promise.all to handle async operations for all user creations

        await Promise.all(
            products.map(
                ({
                    name,
                    description,
                    stock,
                    category_id,
                    subCategory_id,
                    price,
                    images,
                }) =>
                    Product.create({
                        name,
                        description,
                        stock,
                        category_id,
                        subCategory_id,
                        price,
                        images,
                    })
            )
        );


        console.log("50 products have been created!");
    } catch (error) {
        console.error("Error seeding products:", error);
    }
};
