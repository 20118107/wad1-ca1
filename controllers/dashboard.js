import { v4 as uuidv4 } from "uuid";
import accountsController from "./accounts.js";

const dashboardController = {
  createView(req, res) {
    const loggedInUser = accountsController.getCurrentUser(req);
    if (!loggedInUser) {
      return res.redirect("/login");
    }
    const genres = loggedInUser.genres || [];
    const viewData = {
      title: 'Library Dashboard',
      genres: genres,
      user: loggedInUser
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