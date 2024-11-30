import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { UserAddress } from "./UserAddress";
import { UserPayment } from "./UserPayment";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    name: string;
    telephone: string;
    created_at?: Date;
    modified_at?: Date;
    is_admin?: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public email!: string;
    public password!: string;
    public name!: string;
    public telephone!: string;
    public created_at!: Date;
    public modified_at!: Date;
    public is_admin!: boolean;

    public static initModel(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: DataTypes.STRING,
                name: DataTypes.STRING,
                telephone: DataTypes.STRING,
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                modified_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
            },
            {
                sequelize,
                modelName: "User",
                underscored: true,
                timestamps: false,
            }
        );
    }

    public static associate() {
        User.hasMany(UserAddress, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
        User.hasMany(UserPayment, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
    }
}
