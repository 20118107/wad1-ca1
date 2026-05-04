import { v4 as uuidv4 } from "uuid";
import accountsController from "./accounts.js";

const genreController = {

  createView(req, res) {

    const loggedInUser = accountsController.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect("/login");
    }

    const genreName = req.params.genre;

    const genres = loggedInUser.genres || [];
    const genre = genres.find(g => g.title === genreName);

    const sortField = req.query.sort;
    const order = req.query.order === "desc" ? -1 : 1;

    const searchTerm = req.query.searchTerm || "";

    let books = genre.books;

    if (searchTerm) {
      books = genre.books.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
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

    const loggedInUser = accountsController.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect("/login");
    }

    const genreId = req.params.id;

    const genre = loggedInUser.genres.find(g => g.id === genreId);

    const newBook = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author,
      description: "",
      rating: 3
    };

    genre.books.push(newBook);

    res.redirect("/genre/" + genre.title);
  },

  deleteBook(req, res) {

    const loggedInUser = accountsController.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect("/login");
    }

    const genreId = req.params.id;
    const bookId = req.params.bookid;

    const genre = loggedInUser.genres.find(g => g.id === genreId);

    genre.books = genre.books.filter(b => b.id !== bookId);

    res.redirect("/genre/" + genre.title);
  },

  editBook(req, res) {

    const loggedInUser = accountsController.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect("/login");
    }

    const genreId = req.params.id;
    const bookId = req.params.bookid;

    const genre = loggedInUser.genres.find(g => g.id === genreId);

    const book = genre.books.find(b => b.id === bookId);

    const updatedBook = {
      ...book,
      title: req.body.title,
      author: req.body.author,
      rating: Number(req.body.rating) || book.rating
    };

    const index = genre.books.findIndex(b => b.id === bookId);
    genre.books[index] = updatedBook;

    res.redirect("/genre/" + genre.title);
  }

};

export default genreController;