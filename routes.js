'use strict';

import express from 'express';
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from "./controllers/dashboard.js";
import booksController from './controllers/books.js';
import genreController from './controllers/genre.js';
import about from "./controllers/about.js";

const router = express.Router();

// routes
router.get('/', start.createView);
router.get("/dashboard", dashboard.createView);
router.get('/genre/:genre', genreController.createView);
router.get("/book/:id", booksController.viewBook);
router.get("/about", about.createView);
router.post("/dashboard/addgenre", dashboard.addGenre);
router.get("/dashboard/deletegenre/:id", dashboard.deleteGenre);
router.post("/genre/:id/addbook", genreController.addBook);
router.get("/genre/:id/deletebook/:bookid", genreController.deleteBook);
router.post("/genre/:id/editbook/:bookid", genreController.editBook);
router.post("/book/:id/updatedescription", booksController.updateDescription);

export default router;

