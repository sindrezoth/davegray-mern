const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().select('-password').lean();
  if(!notes?.length) {
    return res.status(400).json({ message: 'No notes found.' })
  }

  res.json(notes);
});

const createNewNote = asyncHandler(async (req, res) => {
  const { title, text, author, completed } = req.body;

  if(!title || !text || !author) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const noteObject = { title, text, author: author._id, completed};

  const note = await Note.create(noteObject);

  if(note) {
    res.status(201).json({ message: `New note "${title}" created.` });
  }
  else {
    res.status(400).json({ message: 'Invalid note data received.' });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, text, completed, id, author } = req.body;

  if(!id) {
    return res.status(400).json({ message: 'Note ID are required.' });
  }

  const note = await Note.findById(id).exec();
  if(!note) return res.status(404).json({ message: 'Note not found.' });

  note.title = title || note.title;
  note.text = text || note.text;
  note.completed = completed !== undefined ? completed : note.completed;
  note.author = author || note.author;

  const updatedNote = await note.save();

  res.json({ message: `${updatedNote.title} is updated.` });
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if(!id) res.status(400).json({ message: 'Note ID required.' });

  const note = await Note.findById(id).exec();
  if(!note) return res.status(404).json({ message: 'Note not found' });

  const result = await note.deleteOne();
  const reply = `Note "${note.title}" with ID ${note._id} deleted.`

  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote
}
