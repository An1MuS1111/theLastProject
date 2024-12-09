import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { User } from "../User";

interface PaymentMethodAttributes {
    payment_method_id: number;
    user_id: number;
    // payment_type: "Card" | "PayPal" | "BankTransfer";
    payment_type: "Card" | "PayPal";

    // provider_specific_id?: string;
    status?: "Active" | "Inactive";
    created_at?: Date;
    updated_at?: Date;
}

interface PaymentMethodCreationAttributes
    extends Optional<
        PaymentMethodAttributes,
        | "payment_method_id"
        // | "provider_specific_id"
        | "status"
        | "created_at"
        | "updated_at"
    > {}

export class PaymentMethod
    extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>
    implements PaymentMethodAttributes
{
    public payment_method_id!: number;
    public user_id!: number;
    // public payment_type!: "Card" | "PayPal" | "BankTransfer";
    public payment_type!: "Card" | "PayPal";

    // public provider_specific_id?: string;
    public status?: "Active" | "Inactive";
    public created_at?: Date;
    public updated_at?: Date;

    public static initModel(sequelize: Sequelize) {
        PaymentMethod.init(
            {
                payment_method_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                payment_type: {
                    type: DataTypes.ENUM("Card", "PayPal", "BankTransfer"),
                    allowNull: false,
                },
                // provider_specific_id: {
                //     type: DataTypes.STRING,
                //     allowNull: true,
                // },
                status: {
                    type: DataTypes.ENUM("Active", "Inactive"),
                    defaultValue: "Active",
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "PaymentMethod",
                tableName: "PaymentMethods",
                timestamps: true,
                underscored: true,
            }
        );
    }

    public static associate() {
        PaymentMethod.belongsTo(User, { foreignKey: "user_id", as: "user" });
    }
}
