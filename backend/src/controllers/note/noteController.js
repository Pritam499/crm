import noteService from '../../services/note/noteService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote(req.user.id, req.body);
    res.status(201).json(generateResponse(true, note, 'Note created'));
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getNotes(req.user.id);
    res.json(generateResponse(true, notes, 'Notes fetched'));
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const note = await noteService.getNoteById(req.user.id, req.params.id);
    if (!note) return res.status(404).json(generateResponse(false, {}, 'Note not found'));
    res.json(generateResponse(true, note, 'Note fetched'));
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const updated = await noteService.updateNote(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, 'Note updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await noteService.deleteNote(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, 'Note deleted'));
  } catch (error) {
    next(error);
  }
};
