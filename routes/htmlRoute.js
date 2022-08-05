// Constants
const express = require('express');

const notesRouter = require('./notes');

const app = express();

// Use notes
app.use('/notes', notesRouter);


// Export
module.exports = app
