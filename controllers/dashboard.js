import booksStore from '../models/books-store.js';

const dashboardController = {
  createView(req, res) {
    const books = booksStore.getAllBooks();

    // group books by genre
    const genres = {};
    books.forEach(book => {
      if (!genres[book.genre]) genres[book.genre] = [];
      genres[book.genre].push(book);
    });

    const viewData = {
      title: 'Books Dashboard',
      genres // object: { "Sci-Fi": [...], "Fantasy": [...] }
    };
    res.render('dashboard', viewData);
  }
};

export default dashboardController;


//I used ChatGPT to troubleshoot and point out an issue in this code after recieving errors I could not figure out how to fix