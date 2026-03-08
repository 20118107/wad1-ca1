'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import booksController from './controllers/books.js';
import genreController from './controllers/genre.js';

const router = express.Router();

import start from './controllers/start.js';
router.get('/', start.createView);

import dashboard from "./controllers/dashboard.js";
router.get("/dashboard", dashboard.createView);

router.get('/genre/:genre', genreController.createView);

router.get("/book/:id", booksController.viewBook);

import about from "./controllers/about.js";
router.get("/about", about.createView);

export default router;