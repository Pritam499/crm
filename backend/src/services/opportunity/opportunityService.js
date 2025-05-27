import { Opportunity } from '../../models/opportunity.js';

const createOpportunity = async (ownerId, data) => {
  return await Opportunity.create({ ...data, owner_id: ownerId });
};

const getOpportunities = async (ownerId) => {
  return await Opportunity.findAll({ where: { owner_id: ownerId } });
};

const getOpportunityById = async (ownerId, opportunityId) => {
  return await Opportunity.findOne({ where: { id: opportunityId, owner_id: ownerId } });
};

const updateOpportunity = async (ownerId, opportunityId, data) => {
  await Opportunity.update(data, { where: { id: opportunityId, owner_id: ownerId } });
  return getOpportunityById(ownerId, opportunityId);
};

const deleteOpportunity = async (ownerId, opportunityId) => {
  return await Opportunity.destroy({ where: { id: opportunityId, owner_id: ownerId } });
};

export default {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};
