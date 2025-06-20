import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Lead = sequelize.define("Lead", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  owner_id: { type: DataTypes.UUID, allowNull: false },
  source: DataTypes.STRING,
  status: DataTypes.STRING,
  value: DataTypes.FLOAT
}, {
  tableName: "leads",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true
});
