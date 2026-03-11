// import books store module which contains functions for getting book data
import booksStore from '../models/books-store.js';

// controller for handling book and genre routes
const booksController = {

  // shows all books belonging to a specific genre
  viewGenre(req, res) {

    // gets the genre name from the URL parameter
    const genreName = req.params.genre;

    // get all books from the store and filter them by genre
    const books = booksStore.getAllBooks().filter(b => b.genre === genreName);

    // renders the genre view and displays books that apply
    res.render('genre', {
      title: '${genreName} Books',
      books
    });
  },


  // displays the detailed page for one book
  viewBook(req, res) {

    // retrieve the book id
    const bookId = req.params.id;

    // uses the books store to find the book with the matching ID
    const book = booksStore.getBookById(bookId);

    // render the book view and shows book data
    res.render('book', { title: book.title, book });
  }
};

// export controller so it can be used in the routes
export default booksController;