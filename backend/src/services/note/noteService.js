import { Note } from '../../models/note.js';

const createNote = async (ownerId, data) => {
  return await Note.create({ ...data, owner_id: ownerId });
};

const getNotes = async (ownerId) => {
  return await Note.findAll({ where: { owner_id: ownerId } });
};

const getNoteById = async (ownerId, noteId) => {
  return await Note.findOne({ where: { id: noteId, owner_id: ownerId } });
};

const updateNote = async (ownerId, noteId, data) => {
  await Note.update(data, { where: { id: noteId, owner_id: ownerId } });
  return getNoteById(ownerId, noteId);
};

const deleteNote = async (ownerId, noteId) => {
  return await Note.destroy({ where: { id: noteId, owner_id: ownerId } });
};

export default {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
