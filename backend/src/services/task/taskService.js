import { Task } from '../../models/task.js';

const createTask = async (ownerId, data) => {
  return await Task.create({ ...data, owner_id: ownerId });
};

const getTasks = async (ownerId) => {
  return await Task.findAll({ where: { owner_id: ownerId } });
};

const getTaskById = async (ownerId, taskId) => {
  return await Task.findOne({ where: { id: taskId, owner_id: ownerId } });
};

const updateTask = async (ownerId, taskId, data) => {
  await Task.update(data, { where: { id: taskId, owner_id: ownerId } });
  return getTaskById(ownerId, taskId);
};

const deleteTask = async (ownerId, taskId) => {
  return await Task.destroy({ where: { id: taskId, owner_id: ownerId } });
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
