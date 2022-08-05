// Needs a get, post, and delete(bonus) request
// Ref: 11-01-13
const { v4: uuidv4 } = require('uuid');

// constants:
const notes = require('express').Router();
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/utils');

// Get all notes
// read file from db/db.json
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post new note
// write to file at db/db.json
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

     // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            id: uuidv4(),
            text,
            title,
        };
    
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});


// Delete
// How do I specify which one gets deleted? index.js has an "ID" line?
notes.delete('/:id', (req, res) => {
     // Destructuring assignment for the items in req.body
    const { id } = req.params;
    if (id) {
        readAndDelete(id, './db/db.json');

        const response = {
            status: 'success'
        };

        res.json(response);
    } else {
        res.json('Error deleting note');
    }
});

// Export
module.exports = notes;