import appStore from "../models/app-store.js";

const booksController = {

  viewBook(req, res) {

  const bookId = req.params.id;

  const genres = appStore.getAllGenres();

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

  const bookId = req.params.id;

  const genres = appStore.getAllGenres();

  let genreFound = null;
  let bookIndex = -1;

  for (const genre of genres) {
    const index = genre.books.findIndex(b => b.id === bookId);
    if (index !== -1) {
      genreFound = genre;
      bookIndex = index;
      break;
    }
  }
  const updatedBook = {
    ...genreFound.books[bookIndex],
    description: req.body.description
  };
  appStore.store.editItem(
    "genreCollection",
    genreFound.id,
    bookId,
    "books",
    updatedBook
  );
  res.redirect("/book/" + bookId);
}

};

export default booksController;