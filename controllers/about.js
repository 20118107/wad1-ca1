'use strict';

// controller for handling requests to about page
const aboutController = {

  // renders the about page
  createView(req, res) {

    // data object passed to the handlebars view
    const viewData = {

      image: '/maker.png',
      title: 'About Page',
      text: `Hello! I'm Aedín, and welcome to my library app. This app can be used to store your favourite books
and easily filter them by genre. If you want to contact me, my information is below. Thanks for using my library!`,

      // footer contact info
      contact: {
        email: 'aedinmclarnon@fakeemail.com',
        phone: '+353 23 456 7890',
        address: '32 Fake Address Heights - Bogus Road'
      }
    };

    // fill in the "about" handlebars template and pass in data
    res.render('about', viewData);
  }
};

// export controller so it can be used in router
export default aboutController;