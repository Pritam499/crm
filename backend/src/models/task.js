// backend/src/models/task.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";

export const Task = sequelize.define("Task", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID, allowNull: false },
  title: DataTypes.STRING,
  due_date: DataTypes.DATE,
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: "tasks", schema: "qcrm_v1", timestamps: true, underscored: true
});
Task.belongsTo(Lead, { foreignKey: "lead_id" });
