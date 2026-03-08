'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import booksController from './controllers/books.js';

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
router.get('/', start.createView);

import dashboard from "./controllers/dashboard.js";
router.get("/dashboard", dashboard.createView);
router.get("/book/:id", booksController.viewBook);

import about from "./controllers/about.js";
router.get("/about", about.createView);

export default router;
