import taskService from '../../services/task/taskService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    res.status(201).json(generateResponse(true, task, 'Task created'));
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user.id);
    res.json(generateResponse(true, tasks, 'Tasks fetched'));
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.params.id);
    if (!task) return res.status(404).json(generateResponse(false, {}, 'Task not found'));
    res.json(generateResponse(true, task, 'Task fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updated = await taskService.updateTask(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Task updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Task deleted'));
  } catch (error) {
    next(error);
  }
};
