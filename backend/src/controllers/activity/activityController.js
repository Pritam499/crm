import activityService from '../../services/activity/activityService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createActivity = async (req, res, next) => {
  try {
    const activity = await activityService.createActivity(req.user.id, req.body);
    res.status(201).json(generateResponse(true, activity, 'Activity created'));
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (req, res, next) => {
  try {
    const activities = await activityService.getActivities(req.user.id);
    res.json(generateResponse(true, activities, 'Activities fetched'));
  } catch (error) {
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    const activity = await activityService.getActivityById(req.user.id, req.params.id);
    if (!activity) return res.status(404).json(generateResponse(false, {}, 'Activity not found'));
    res.json(generateResponse(true, activity, 'Activity fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (req, res, next) => {
  try {
    const updated = await activityService.updateActivity(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Activity updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    await activityService.deleteActivity(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Activity deleted'));
  } catch (error) {
    next(error);
  }
};
