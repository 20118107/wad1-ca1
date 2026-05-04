'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));

const handlebars = create({extname: '.hbs'});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
app.use(express.static("public"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.listen(port, () => logger.info('Your app is listening on port ${port}'));