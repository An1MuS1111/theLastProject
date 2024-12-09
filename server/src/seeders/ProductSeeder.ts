import { faker } from "@faker-js/faker";
import {
    Product,
    ProductCategory,
    ProductSubCategory,
} from "../models/Product"; // Adjust the path as needed

// seeding ProductCategories and Subcategories
const ProductCategorySeeder = async () => {
    try {
        // Create 5 ProductCategories
        const categories = await Promise.all(
            Array.from({ length: 5 }).map(() =>
                ProductCategory.create({
                    name: faker.commerce.department(),
                    description: faker.commerce.productDescription(),
                })
            )
        );

        console.log("5 ProductCategories have been created!");

        // Create corresponding ProductSubCategories
        const subCategories = [];
        for (const category of categories) {
            const subCategoryCount = faker.number.int({ min: 1, max: 2 }); // Each category has 1-2 subcategories
            for (let i = 0; i < subCategoryCount; i++) {
                subCategories.push(
                    ProductSubCategory.create({
                        name: faker.commerce.productAdjective(),
                        description: faker.commerce.productDescription(),
                        category_id: category.id,
                    })
                );
            }
        }

        await Promise.all(subCategories);

        console.log(
            `${subCategories.length} ProductSubCategories have been created!`
        );
    } catch (error) {
        console.error(
            "Error seeding ProductCategory and ProductSubCategory:",
            error
        );
    }
};

export const ProductSeeder = async () => {
    try {
        await ProductCategorySeeder();

        // Generate an array of 50 products
        const products = Array.from({ length: 50 }).map(() => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            stock: faker.number.int({ min: 0, max: 100 }), // Random stock quantity
            category_id: faker.number.int({ min: 1, max: 5 }), // Replace with valid category IDs
            subCategory_id: faker.number.int({ min: 1, max: 10 }), // Replace with valid subcategory IDs
            price: parseFloat(faker.commerce.price({ min: 10, max: 100000 })), // Random price between 10 and 1000
            images: Array.from({
                length: faker.number.int({ min: 1, max: 5 }),
            }).map(() => faker.image.urlPicsumPhotos()),
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
