// backend/src/controllers/lead/leadController.js
import leadService from '../../services/lead/leadService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.user.id, req.body);
    res.status(201).json(generateResponse(true, lead, 'Lead created'));
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const leads = await leadService.getLeads(req.user.id);
    res.json(generateResponse(true, leads, 'Leads fetched'));
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.user.id, req.params.id);
    if (!lead) return res.status(404).json(generateResponse(false, {}, 'Lead not found'));
    res.json(generateResponse(true, lead, 'Lead fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const updated = await leadService.updateLead(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Lead updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    await leadService.deleteLead(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Lead deleted'));
  } catch (error) {
    next(error);
  }
};
