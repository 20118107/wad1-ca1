import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from "uuid";

const genreController = {

  createView(req, res) {

    const genreName = req.params.genre;

    const genres = appStore.getAllGenres();

    const genre = genres.find(g => g.title === genreName);

    const viewData = {
      title: `${genreName} Books`,
      genre: genre,
      books: genre.books
    };

    res.render('genre', viewData);
  },

  addBook(req, res) {

    const genreId = req.params.id;

    const newBook = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author
    };

    appStore.store.addItem("genreCollection", genreId, "books", newBook);

    res.redirect("/genre/" + req.body.genreName);
  },   // ✅ comma fixed

  deleteBook(req, res) {

    const genreId = req.params.id;
    const bookId = req.params.bookid;

    const genre = appStore.getGenre(genreId);

    appStore.store.removeItem("genreCollection", genreId, "books", bookId);

    res.redirect("/genre/" + genre.title);
  },

editBook(req, res) {

  const genreId = req.params.id;
  const bookId = req.params.bookid;

  const updatedBook = {
    id: bookId,
    title: req.body.title,
    author: req.body.author
  };

  appStore.store.editItem("genreCollection", genreId, bookId, "books", updatedBook);

  const genre = appStore.getGenre(genreId);

  res.redirect("/genre/" + genre.title);
}

};

export default genreController;