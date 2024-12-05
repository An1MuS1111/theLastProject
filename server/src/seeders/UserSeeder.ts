import { faker } from "@faker-js/faker";
import { User } from "../models/User"; // Adjust the import path as needed

export const UserSeeder = async () => {
    try {
        // Create an array of user objects
        const users = Array.from({ length: 30 }).map(() => ({
            image: faker.image.avatar(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.person.fullName(),
            telephone: faker.phone.number(),
            is_admin: faker.datatype.boolean(),
        }));
        // Use Promise.all to handle async operations for all user creations
        await Promise.all(
            users.map(({ email, password, name, telephone, is_admin, image }) =>
                User.create({
                    email,
                    password,
                    name,
                    telephone,
                    is_admin,
                    image,
                })
            )
        );
        console.log("30 users have been created successfully");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};
