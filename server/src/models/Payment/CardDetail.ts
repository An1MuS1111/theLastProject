import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { PaymentMethod } from ".";

interface CardDetailAttributes {
    card_detail_id: number;
    payment_method_id: number;
    card_number: string;
    card_type: string;
    card_expiry: string;
    tokenized_card: string;
    created_at?: Date;
}

interface CardDetailCreationAttributes
    extends Optional<CardDetailAttributes, "card_detail_id" | "created_at"> {}

export class CardDetail
    extends Model<CardDetailAttributes, CardDetailCreationAttributes>
    implements CardDetailAttributes
{
    public card_detail_id!: number;
    public payment_method_id!: number;
    public card_number!: string;
    public card_type!: string;
    public card_expiry!: string;
    public tokenized_card!: string;
    public created_at?: Date;

    public static initModel(sequelize: Sequelize) {
        CardDetail.init(
            {
                card_detail_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                payment_method_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                card_number: {
                    type: DataTypes.STRING(4),
                    allowNull: false,
                },
                card_type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                card_expiry: {
                    type: DataTypes.STRING(5),
                    allowNull: false,
                },
                tokenized_card: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "CardDetail",
                tableName: "CardDetails",
                timestamps: false,
            }
        );
    }

    public static associate() {
        CardDetail.belongsTo(PaymentMethod, {
            foreignKey: "payment_method_id",
            as: "paymentMethod",
        });
    }
}
