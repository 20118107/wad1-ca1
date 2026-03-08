// import books store which contains functions for getting book data
import booksStore from '../models/books-store.js';

// controller that for handles book and genre routes
const booksController = {

  // shows all books belonging to a specific genre
  viewGenre(req, res) {

    // gets the genre name from the url parameter
    const genreName = req.params.genre;

    // get all books from store and filter them by the genre
    const books = booksStore.getAllBooks().filter(b => b.genre === genreName);

    // render the genre view and pass the books that apply
    res.render('genre', {
      title: `${genreName} Books`,
      books
    });
  },


  // shows the detailed page for a single book
  viewBook(req, res) {

    // retrieves the book id from the url parameter
    const bookId = req.params.id;

    // uses the books store to find the book with the matching id
    const book = booksStore.getBookById(bookId);


    // rendesr the book view and passes the book data
    res.render('book', { title: book.title, book });
  }
};

// export controller so it can be used in routes
export default booksController;
