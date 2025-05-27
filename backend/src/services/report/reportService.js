// backend/src/services/report/reportService.js
import { Report } from '../../models/report.js';

const createReport = async (ownerId, data) => {
  return await Report.create({ ...data, owner_id: ownerId });
};

const getReports = async (ownerId) => {
  return await Report.findAll({ where: { owner_id: ownerId } });
};

const getReportById = async (ownerId, reportId) => {
  return await Report.findOne({ where: { id: reportId, owner_id: ownerId } });
};

const updateReport = async (ownerId, reportId, data) => {
  await Report.update(data, { where: { id: reportId, owner_id: ownerId } });
  return getReportById(ownerId, reportId);
};

const deleteReport = async (ownerId, reportId) => {
  return await Report.destroy({ where: { id: reportId, owner_id: ownerId } });
};

// NEW: fetch by type
const getReportsByType = async (ownerId, type) => {
  return await Report.findAll({ where: { owner_id: ownerId, type } });
};

export default {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportsByType,    // export new method
};
