import booksStore from '../models/books-store.js';

const booksController = {
  viewGenre(req, res) {
    const genreName = req.params.genre;
    const books = booksStore.getAllBooks().filter(b => b.genre === genreName);

    res.render('genre', {
      title: `${genreName} Books`,
      books
    });
  },


  viewBook(req, res) {
    const bookId = req.params.id;
    const book = booksStore.getBookById(bookId);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.render('book', { title: book.title, book });
  }
};

export default booksController;