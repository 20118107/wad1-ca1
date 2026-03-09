import booksStore from '../models/books-store.js';

const dashboardController = {
  createView(request, response) {

    const allBooks = booksStore.getAllBooks();

    const genres = [...new Set(allBooks.map(book => book.genre))];

    const viewData = {
      title: 'Library Dashboard',
      genres: genres
    };

    response.render('dashboard', viewData);
  }
};

export default dashboardController;