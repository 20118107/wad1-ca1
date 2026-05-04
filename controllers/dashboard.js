import { v4 as uuidv4 } from "uuid";
import accountsController from "./accounts.js";

const dashboardController = {
  createView(req, res) {
    const loggedInUser = accountsController.getCurrentUser(req);
    if (!loggedInUser) {
      return res.redirect("/login");
    }
    const genres = loggedInUser.genres || [];
const numGenres = genres.length;

const numBooks = genres.reduce(
  (total, genre) => total + genre.books.length,
  0
);
const avgBooks = numGenres > 0 ? numBooks / numGenres : 0;
    const viewData = {
  title: 'Library Dashboard',
  genres: genres,
  user: loggedInUser,

  stats: {
    displayNumGenres: numGenres,
    displayNumBooks: numBooks,
    displayAverage: avgBooks.toFixed(2)
  }
};
    res.render('dashboard', viewData);
  },

  addGenre(request, response) {
    const loggedInUser = accountsController.getCurrentUser(request);
    if (!loggedInUser) {
      return response.redirect("/login");
    }

    const newGenre = {
      id: uuidv4(),
      title: request.body.title,
      books: []
    };

    loggedInUser.genres.push(newGenre);
    response.redirect("/dashboard");
  },

  deleteGenre(request, response) {

    const loggedInUser = accountsController.getCurrentUser(request);
    if (!loggedInUser) {
      return response.redirect("/login");
    }
    const genreId = request.params.id;
    loggedInUser.genres = loggedInUser.genres.filter(g => g.id !== genreId);

    response.redirect("/dashboard");
  },
};

export default dashboardController;