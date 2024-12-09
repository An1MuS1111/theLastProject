import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { PaymentMethod } from "./PaymentMethod";

interface PayPalDetailAttributes {
    paypal_detail_id: number;
    payment_method_id: number;
    paypal_email: string;
    created_at?: Date;
}

interface PayPalDetailCreationAttributes
    extends Optional<
        PayPalDetailAttributes,
        "paypal_detail_id" | "created_at"
    > {}

export class PayPalDetail
    extends Model<PayPalDetailAttributes, PayPalDetailCreationAttributes>
    implements PayPalDetailAttributes
{
    public paypal_detail_id!: number;
    public payment_method_id!: number;
    public paypal_email!: string;
    public created_at?: Date;

    public static initModel(sequelize: Sequelize) {
        PayPalDetail.init(
            {
                paypal_detail_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                payment_method_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                paypal_email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: true, // Ensures it's a valid email
                    },
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "PayPalDetail",
                tableName: "PayPalDetails",
                timestamps: false,
            }
        );
    }

    public static associate() {
        PayPalDetail.belongsTo(PaymentMethod, {
            foreignKey: "payment_method_id",
            as: "paymentMethod",
        });
    }
}
