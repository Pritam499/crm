import { Account } from "../../models/account.js";

const createAccount = async (ownerId, data) => {
  return await Account.create({ ...data, owner_id: ownerId });
};

const getAccounts = async (ownerId) => {
  return await Account.findAll({ where: { owner_id: ownerId } });
};

const getAccountById = async (ownerId, accountId) => {
  return await Account.findOne({ where: { id: accountId, owner_id: ownerId } });
};

const updateAccount = async (ownerId, accountId, data) => {
  await Account.update(data, { where: { id: accountId, owner_id: ownerId } });
  return getAccountById(ownerId, accountId);
};

const deleteAccount = async (ownerId, accountId) => {
  return await Account.destroy({ where: { id: accountId, owner_id: ownerId } });
};

export default {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
