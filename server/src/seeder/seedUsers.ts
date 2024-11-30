import { faker } from '@faker-js/faker';
import { User } from '../models/User'; // Adjust the import path as needed
import sequelize from '../config/database';   // Adjust the import path for your sequelize setup

(async function seedUsers() {
    await sequelize.sync({ force: false }); // Ensures the database is connected

    const users = Array.from({ length: 30 }).map(() => ({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.fullName(),
        telephone: faker.phone.number(),
        is_admin: faker.datatype.boolean(),
        created_at: faker.date.past(),
        modified_at: faker.date.recent(),
    }));

    try {
        await User.bulkCreate(users);
        console.log('30 users have been seeded successfully!');
    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        await sequelize.close(); // Close the database connection
    }
})();


