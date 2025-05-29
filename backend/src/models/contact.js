import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Contact = sequelize.define("Contact", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: DataTypes.UUID,
  account_id: DataTypes.UUID,
  owner_id: DataTypes.UUID,
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: DataTypes.STRING,
  contact_status: {
    type: DataTypes.ENUM("unassigned", "active", "inactive"),
    defaultValue: "unassigned"
  },
  created_from: {
    type: DataTypes.STRING,
    defaultValue: "Manual"
  }
}, {
  tableName: "contacts",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true
});
