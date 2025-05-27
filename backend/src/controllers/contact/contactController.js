// backend/src/controllers/contact.controller.js
import contactService from '../../services/contact/contactService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createContact = async (req, res, next) => {
  try {
    const contact = await contactService.createContact(req.user.id, req.body);
    res.status(201).json(generateResponse(true, contact, 'Contact created'));
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getContacts(req.user.id);
    res.json(generateResponse(true, contacts, 'Contacts fetched'));
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.user.id, req.params.id);
    if (!contact) return res.status(404).json(generateResponse(false, {}, 'Contact not found'));
    res.json(generateResponse(true, contact, 'Contact fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updated = await contactService.updateContact(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Contact updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    await contactService.deleteContact(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Contact deleted'));
  } catch (error) {
    next(error);
  }
};