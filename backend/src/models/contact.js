// backend/src/models/contact.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";

export const Contact = sequelize.define("Contact", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID, allowNull: false },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, allowNull: false },
  phone: DataTypes.STRING,
}, {
  tableName: "contacts", schema: "qcrm_v1", timestamps: true, underscored: true
});
Contact.belongsTo(Lead, { foreignKey: "lead_id" });
