import accountsController from "./accounts.js";

const booksController = {

  viewBook(req, res) {

    const loggedInUser = accountsController.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect("/login");
    }

    const bookId = req.params.id;

    const genres = loggedInUser.genres || [];

    let foundBook = null;
    let genre = null;

    for (const g of genres) {
      const book = g.books.find(b => b.id === bookId);
      if (book) {
        foundBook = book;
        genre = g;
        break;
      }
    }

    const viewData = {
      title: foundBook.title,
      book: foundBook,
      genre: genre
    };

    res.render("book", viewData);
  },

  updateDescription(req, res) {

    const loggedInUser = accountsController.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect("/login");
    }

    const bookId = req.params.id;

    const genres = loggedInUser.genres || [];

    let foundBook = null;
    let genre = null;

    for (const g of genres) {
      const b = g.books.find(book => book.id === bookId);
      if (b) {
        foundBook = b;
        genre = g;
        break;
      }
    }

    const updatedBook = {
      ...foundBook,
      description: req.body.description,
      rating: Number(req.body.rating) || foundBook.rating
    };

    const index = genre.books.findIndex(b => b.id === bookId);
    genre.books[index] = updatedBook;

    res.redirect("/book/" + bookId);
  }

};

export default booksController;