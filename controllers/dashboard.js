// import the books store which contains functions for accessing books
import booksStore from '../models/books-store.js';

// create a controller object that handle dashboard routes
const dashboardController = {

  // function that renders the dashboard page
  createView(request, response) {

    // get all books from the books store model
    const allBooks = booksStore.getAllBooks();

    // extract genres from the books array and remove duplicates
    //  map creates an array of just the genres
    // new set removes duplicates
    // ... converts the set back into an array
    const genres = [...new Set(allBooks.map(book => book.genre))];

    // data object that will be passed to the template when rendering
    const viewData = {
      title: 'Library Dashboard',
      genres: genres
    };

    // renders the dashboard template and pass the viewdata object to it
    response.render('dashboard', viewData);
  }
};

// export controller so it can be used in routes
export default dashboardController;