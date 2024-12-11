import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { Product, ProductSubCategory } from "./";
interface ProductCategoryAttributes {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    modified_at: Date;
    deleted_at?: Date;
}

interface ProductCategoryCreationAttributes
    extends Optional<
        ProductCategoryAttributes,
        "id" | "created_at" | "modified_at" | "deleted_at"
    > {}

export class ProductCategory
    extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
    implements ProductCategoryAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public created_at!: Date;
    public modified_at!: Date;
    public deleted_at?: Date;

    public static initModel(sequelize: Sequelize) {
        ProductCategory.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    // Fixed the mismatch in property name
                    type: DataTypes.TEXT,
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
                    allowNull: true, // Optional field for soft deletion
                },
            },
            {
                sequelize,
                modelName: "ProductCategory",
                tableName: "ProductCategories", // Custom table name, optional

                timestamps: true, // Enables created_at and updated_at
                paranoid: true, // Enables soft deletion with deleted_at
                createdAt: "created_at",
                updatedAt: "modified_at",
                deletedAt: "deleted_at",
            }
        );
    }

    public static associate() {
        // Relationship with Product
        ProductCategory.hasMany(Product, {
            foreignKey: "category_id",
            as: "products",
            onDelete: "CASCADE",
        });

        // Relationship with ProductSubCategory
        ProductCategory.hasMany(ProductSubCategory, {
            foreignKey: "category_id",
            as: "subCategories",
            onDelete: "CASCADE",
        });
    }
}
