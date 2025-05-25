// backend/src/models/note.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";

export const Note = sequelize.define("Note", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID, allowNull: false },
  content: DataTypes.TEXT,
}, {
  tableName: "notes", schema: "qcrm_v1", timestamps: true, underscored: true
});
Note.belongsTo(Lead, { foreignKey: "lead_id" });
