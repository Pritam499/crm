// backend/src/models/opportunity.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";

export const Opportunity = sequelize.define("Opportunity", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID, allowNull: false },
  name: DataTypes.STRING,
  stage: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  close_date: DataTypes.DATE,
}, {
  tableName: "opportunities", schema: "qcrm_v1", timestamps: true, underscored: true
});
Opportunity.belongsTo(Lead, { foreignKey: "lead_id" });
