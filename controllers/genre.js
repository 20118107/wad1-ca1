import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from "uuid";

const genreController = {
  createView(req, res) {

  const genreName = req.params.genre;
  const genres = appStore.getAllGenres();
  const genre = genres.find(g => g.title === genreName);

  const sortField = req.query.sort;
  const order = req.query.order === "desc" ? -1 : 1;

  const searchTerm = req.query.searchTerm || "";

  let books;

  if (searchTerm) {
    books = appStore.searchBooks(genre.id, searchTerm);
  } else {
    books = genre.books;
  }

  if (sortField) {
    books = books.slice().sort((a, b) => {

      if (sortField === "title") {
        return a.title.localeCompare(b.title) * order;
      }

      if (sortField === "rating") {
        return (a.rating - b.rating) * order;
      }

      return 0;
    });
  }

  const viewData = {
    title: `${genreName} Books`,
    genre: genre,
    books: books,

    titleSelected: sortField === "title",
    ratingSelected: sortField === "rating",
    ascSelected: req.query.order === "asc",
    descSelected: req.query.order === "desc",

    search: searchTerm
  };

  res.render("genre", viewData);
},

  addBook(req, res) {

    const genreId = req.params.id;

    const newBook = {
     id: uuidv4(),
     title: req.body.title,
     author: req.body.author,
     description: "",
     rating: 3
    };

    appStore.store.addItem("genreCollection", genreId, "books", newBook);

    res.redirect("/genre/" + req.body.genreName);
  },

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

  const genre = appStore.getGenre(genreId);

  const book = genre.books.find(b => b.id === bookId);

  const updatedBook = {
  ...book,
  title: req.body.title,
  author: req.body.author,
  rating: Number(req.body.rating) || book.rating
};

  appStore.store.editItem(
    "genreCollection",
    genreId,
    bookId,
    "books",
    updatedBook
  );

  res.redirect("/genre/" + genre.title);
},




};

export default genreController;