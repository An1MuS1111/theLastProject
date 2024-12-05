import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { Product, ProductCategory } from "./";
interface ProductSubCategoryAttributes {
    id: number;
    name: string;
    description: string;
    category_id: number;
    created_at: Date;
    modified_at: Date;
    deleted_at?: Date;
}

interface ProductSubCategoryCreationAttributes
    extends Optional<ProductSubCategoryAttributes, "id"> {}

export class ProductSubCategory
    extends Model<
        ProductSubCategoryAttributes,
        ProductSubCategoryCreationAttributes
    >
    implements ProductSubCategoryAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public category_id!: number;
    public created_at!: Date;
    public modified_at!: Date;
    public deleted_at?: Date;

    public static initModel(sequelize: Sequelize) {
        ProductSubCategory.init(
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
                category_id: {
                    type: DataTypes.INTEGER,
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
                modelName: "ProductSubCategory",
                tableName: "product_sub_categories", // Custom table name, optional
                underscored: true, // Use snake_case in the database
                timestamps: true, // Enables created_at and updated_at
                paranoid: true, // Enables soft deletion with deleted_at
                createdAt: "created_at",
                updatedAt: "modified_at",
                deletedAt: "deleted_at",
            }
        );
    }

    public static associate() {
        // Relationship with ProductCategory
        ProductSubCategory.belongsTo(ProductCategory, {
            foreignKey: "category_id",
            as: "category",
        });

        // Relationship with Product
        ProductSubCategory.hasMany(Product, {
            foreignKey: "sub_category_id",
            as: "products",
            onDelete: "CASCADE",
        });
    }
}
