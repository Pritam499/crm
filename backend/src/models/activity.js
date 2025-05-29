// backend/src/models/activity.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./lead.js";
import { Opportunity } from "./opportunity.js";

export const Activity = sequelize.define("Activity", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lead_id: { type: DataTypes.UUID, allowNull: false },
  type: DataTypes.STRING,
  details: DataTypes.JSONB,
  owner_id: { type: DataTypes.UUID, allowNull: false },
  opportunity_id: { type: DataTypes.UUID, allowNull: false }
}, {
  tableName: "activities",
  schema: "qcrm_v1",
  timestamps: true,
  underscored: true
});

Activity.belongsTo(Lead, { foreignKey: "lead_id" });
// Activity.belongsTo(Opportunity, { foreignKey: "opportunity_id" });
