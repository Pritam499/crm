// backend/src/models/users.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true
  },
  email: {
    type: DataTypes.TEXT, allowNull: false, unique: true
  },
  name: {
    type: DataTypes.TEXT, allowNull: false
  },
  otp: {
    type: DataTypes.STRING, allowNull: true
  },
  otp_expires_at: {
    type: DataTypes.DATE, allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN, defaultValue: true
  },
}, {
  tableName: "users",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true,
});
