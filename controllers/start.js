'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

// controller for welcome page
const start = {
  createView(request, response) {
    // log that the start page is being loaded
    logger.info("Start page loading!");
    
    // prepares the data
    const viewData = {
      title: "CA1 Starter App",
      info: appStore.getAppInfo()      // retrieves app info from the json store
    };
    
    // renders the start view and passes viewdata
    response.render('start', viewData);   
  },
};

// export controller so it can be used in routes
export default start;