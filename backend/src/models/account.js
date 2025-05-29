import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Account = sequelize.define("Account", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  owner_id: { type: DataTypes.UUID, allowNull: false },
  industry: DataTypes.STRING,
  website: DataTypes.STRING
}, {
  tableName: "accounts",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true
});
