import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from "uuid";
import accountsController from "./accounts.js";

const dashboardController = {

  createView(req, res) {

  const loggedInUser = accountsController.getCurrentUser(req);

  if (!loggedInUser) {
    return res.redirect("/login");
  }

  const genres = appStore.getAllGenres();

  const viewData = {
    title: 'Library Dashboard',
    genres: genres,
    user: loggedInUser
  };

  res.render('dashboard', viewData);
},

  addGenre(request, response) {

    const newGenre = {
      id: uuidv4(),
      title: request.body.title,
      books: []
    };

    appStore.store.addCollection("genreCollection", newGenre);

    response.redirect("/dashboard");
  },

  deleteGenre(request, response) {

    const genreId = request.params.id;

    const genre = appStore.getGenre(genreId);

    appStore.store.removeCollection("genreCollection", genre);

    response.redirect("/dashboard");
  },


};

export default dashboardController;