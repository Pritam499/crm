// backend/src/services/lead/leadService.js
import { Lead } from '../../models/lead.js';

const createLead = async (ownerId, data) => {
  return await Lead.create({ ...data, owner_id: ownerId });
};

const getLeads = async (ownerId) => {
  return await Lead.findAll({ where: { owner_id: ownerId } });
};

const getLeadById = async (ownerId, leadId) => {
  return await Lead.findOne({
    where: { id: leadId, owner_id: ownerId }
  });
};

const updateLead = async (ownerId, leadId, data) => {
  await Lead.update(data, { where: { id: leadId, owner_id: ownerId } });
  return getLeadById(ownerId, leadId);
};

const deleteLead = async (ownerId, leadId) => {
  return await Lead.destroy({ where: { id: leadId, owner_id: ownerId } });
};

export default {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
