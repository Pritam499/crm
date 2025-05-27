import { Activity } from '../../models/activity.js';

const createActivity = async (ownerId, data) => {
  return await Activity.create({ ...data, owner_id: ownerId });
};

const getActivities = async (ownerId) => {
  return await Activity.findAll({ where: { owner_id: ownerId } });
};

const getActivityById = async (ownerId, activityId) => {
  return await Activity.findOne({ where: { id: activityId, owner_id: ownerId } });
};

const updateActivity = async (ownerId, activityId, data) => {
  await Activity.update(data, { where: { id: activityId, owner_id: ownerId } });
  return getActivityById(ownerId, activityId);
};

const deleteActivity = async (ownerId, activityId) => {
  return await Activity.destroy({ where: { id: activityId, owner_id: ownerId } });
};

export default {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
