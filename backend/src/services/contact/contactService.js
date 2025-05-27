// backend/src/services/contact/contactService.js
import { Contact } from '../../models/contact.js';

const createContact = async (ownerId, data) => {
  return await Contact.create({ ...data, owner_id: ownerId });
};

const getContacts = async (ownerId) => {
  return await Contact.findAll({ where: { owner_id: ownerId } });
};

const getContactById = async (ownerId, contactId) => {
  return await Contact.findOne({ where: { id: contactId, owner_id: ownerId } });
};

const updateContact = async (ownerId, contactId, data) => {
  await Contact.update(data, { where: { id: contactId, owner_id: ownerId } });
  return getContactById(ownerId, contactId);
};

const deleteContact = async (ownerId, contactId) => {
  return await Contact.destroy({ where: { id: contactId, owner_id: ownerId } });
};

export default {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
