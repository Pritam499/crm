import opportunityService from '../../services/opportunity/opportunityService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createOpportunity = async (req, res, next) => {
  try {
    const opportunity = await opportunityService.createOpportunity(req.user.id, req.body);
    res.status(201).json(generateResponse(true, opportunity, 'Opportunity created'));
  } catch (error) {
    next(error);
  }
};

export const getOpportunities = async (req, res, next) => {
  try {
    const opportunities = await opportunityService.getOpportunities(req.user.id);
    res.json(generateResponse(true, opportunities, 'Opportunities fetched'));
  } catch (error) {
    next(error);
  }
};

export const getOpportunity = async (req, res, next) => {
  try {
    const opportunity = await opportunityService.getOpportunityById(req.user.id, req.params.id);
    if (!opportunity) return res.status(404).json(generateResponse(false, {}, 'Opportunity not found'));
    res.json(generateResponse(true, opportunity, 'Opportunity fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateOpportunity = async (req, res, next) => {
  try {
    const updated = await opportunityService.updateOpportunity(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Opportunity updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteOpportunity = async (req, res, next) => {
  try {
    await opportunityService.deleteOpportunity(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Opportunity deleted'));
  } catch (error) {
    next(error);
  }
};
