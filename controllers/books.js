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

  appStore.store.editItem(
    "genreCollection",
    genre.id,
    bookId,
    "books",
    updatedBook
  );

  res.redirect("/book/" + bookId);
}

};

export default booksController;