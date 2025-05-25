// backend/src/models/report.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Report = sequelize.define("Report", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  params: { type: DataTypes.JSONB, allowNull: false },
  result: { type: DataTypes.JSONB },
}, {
  tableName: "reports", schema: "qcrm_v1", timestamps: true, underscored: true
});
