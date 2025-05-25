// // src/models/subscriptions.js

// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// import { Users } from "./users.js";

// export const Subscription = sequelize.define(
//   "Subscription",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     user_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: Users,
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     plan: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         isIn: [["free", "pro"]],
//       },
//     },
//     payment_method: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         isIn: [["credit_card", "paypal", "upi"]],
//       },
//     },
//     start_date: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     trial_end_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         isIn: [["active", "expired", "canceled"]],
//       },
//     },
//   },
//   {
//     tableName: "subscriptions",
//     schema: "soft_tracker",
//     timestamps: true,
//     underscored: true,
//   }
// );
// src/models/subscription.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Users } from './users.js';

export const Subscription = sequelize.define(
  'Subscription',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Users, key: 'id' },
      onDelete: 'CASCADE'
    },
    razorpay_order_id: { type: DataTypes.STRING, allowNull: false },
    razorpay_payment_id: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'created' },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'INR' },
  },
  {
    tableName: 'subscriptions',
    schema: 'soft_tracker',
    timestamps: true,
    underscored: true,
  }
);
