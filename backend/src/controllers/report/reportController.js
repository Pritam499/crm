import reportService from '../../services/report/reportService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createReport = async (req, res, next) => {
  try {
    const report = await reportService.createReport(req.user.id, req.body);
    res.status(201).json(generateResponse(true, report, 'Report created'));
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const reports = await reportService.getReports(req.user.id);
    res.json(generateResponse(true, reports, 'Reports fetched'));
  } catch (error) {
    next(error);
  }
};

export const getReport = async (req, res, next) => {
  try {
    const report = await reportService.getReportById(req.user.id, req.params.id);
    if (!report) return res.status(404).json(generateResponse(false, {}, 'Report not found'));
    res.json(generateResponse(true, report, 'Report fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const updated = await reportService.updateReport(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Report updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteReport = async (req, res, next) => {
  try {
    await reportService.deleteReport(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Report deleted'));
  } catch (error) {
    next(error);
  }
};
export const getReportByType = async (req, res, next) => {
  try {
    const reports = await reportService.getReportsByType(req.user.id, req.params.type);
    res.json(generateResponse(true, reports, 'Reports by type fetched'));
  } catch (error) {
    next(error);
  }
};