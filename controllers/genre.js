import booksStore from '../models/books-store.js';

// controller for showing all books in a specific genre
const genreController = {
  createView(req, res) {
    // gets the genre from the URL parameter
    const genreName = req.params.genre;

    // get all books from the store
    const allBooks = booksStore.getAllBooks();

    // filter books to only include ones match the genre
    const booksInGenre = allBooks.filter(book => book.genre === genreName);

    // gets data to pass to template
    const viewData = {
      title: `${genreName} Books`,
      genre: genreName,
      books: booksInGenre
    };

    // renders the genre view and passes the data
    res.render('genre', viewData);
  }
};

// export controller so it can be used in routes
export default genreController;