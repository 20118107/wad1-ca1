'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accountsController from "./accounts.js";

// controller for welcome page
const start = {
  createView(request, response) {
    logger.info("Start page loading!");

    const user = accountsController.getCurrentUser(request); 

    const viewData = {
      title: "CA1 Starter App",
      info: appStore.getAppInfo(),
      user: user
    };

    response.render('start', viewData);
  },
};

export default start;