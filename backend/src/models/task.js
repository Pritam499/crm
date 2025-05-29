import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";
import { Opportunity } from "./opportunity.js";

// Define Task model first
export const Task = sequelize.define("Task", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID, allowNull: false },
  title: DataTypes.STRING,
  due_date: DataTypes.DATE,
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  owner_id: { type: DataTypes.UUID, allowNull: false },
  opportunity_id: { type: DataTypes.UUID, allowNull: false }
}, {
  tableName: "tasks",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true
});

// Now import Opportunity after Task is defined

Task.belongsTo(Lead, { foreignKey: "lead_id" });
// Task.belongsTo(Opportunity, { foreignKey: "opportunity_id" });
