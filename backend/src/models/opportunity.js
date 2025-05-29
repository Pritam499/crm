import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";
import { Task } from "./task.js";
import { Note } from "./note.js";
import { Activity } from "./activity.js";

export const Opportunity = sequelize.define("Opportunity", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID },
  name: DataTypes.STRING,
  stage: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  close_date: DataTypes.DATE,
  owner_id: DataTypes.UUID,
  account_id: DataTypes.UUID,
  parent_id: DataTypes.UUID
}, {
  tableName: "opportunities",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true
});

Opportunity.belongsTo(Lead, { foreignKey: "lead_id" });
Opportunity.hasMany(Task, { foreignKey: "opportunity_id" });
Opportunity.hasMany(Note, { foreignKey: "opportunity_id" });
Opportunity.hasMany(Activity, { foreignKey: "opportunity_id" });
