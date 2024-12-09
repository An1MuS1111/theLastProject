import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { ProductCategory, ProductSubCategory } from "./";

interface ProductAttributes {
    id: number;
    name: string;
    description: string;
    stock: number;
    category_id: number;
    subCategory_id?: number; // Made optional
    price: number;
    images: string[]; // Array of image URLs or paths
    created_at?: Date;
    modified_at?: Date;
    deleted_at?: Date; // Made optional for soft deletion compatibility
}

interface ProductCreationAttributes
    extends Optional<
        ProductAttributes,
        "id" | "created_at" | "modified_at" | "deleted_at" | "subCategory_id"
    > {}

export class Product
    extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public stock!: number;
    public category_id!: number;
    public subCategory_id?: number; // Optional field
    public price!: number;
    public images!: string[];
    public created_at?: Date;
    public modified_at?: Date;
    public deleted_at?: Date;

    public static initModel(sequelize: Sequelize) {
        Product.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [2, 255], // Name must be between 2 and 255 characters
                    },
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                stock: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        min: 0, // Stock cannot be negative
                    },
                },
                category_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                subCategory_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true, // Optional subcategory
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    validate: {
                        min: 0, // Price cannot be negative
                    },
                },
                images: {
                    type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL-style array
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                modified_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Product",
                tableName: "Products",
                underscored: true,
                timestamps: true,
                paranoid: true, // Enables soft deletion
                createdAt: "created_at",
                updatedAt: "modified_at",
                deletedAt: "deleted_at",
            }
        );
    }

    public static associate() {
        Product.belongsTo(ProductCategory, {
            foreignKey: "category_id",
            as: "category",
        });
        Product.belongsTo(ProductSubCategory, {
            foreignKey: "subCategory_id",
            as: "subCategory",
        });
        // Add more associations as necessary (e.g., orders, reviews)
    }
}
