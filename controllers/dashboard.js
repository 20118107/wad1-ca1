import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from "uuid";

const dashboardController = {

  createView(request, response) {

    const genres = appStore.getAllGenres();

    const viewData = {
      title: 'Library Dashboard',
      genres: genres
    };

    response.render('dashboard', viewData);
  },

  addGenre(request, response) {

    const newGenre = {
      id: uuidv4(),
      title: request.body.title,
      books: []
    };

    appStore.store.addCollection("genreCollection", newGenre);

    response.redirect("/dashboard");
  },   // ✅ THIS COMMA WAS MISSING

  deleteGenre(request, response) {

    const genreId = request.params.id;

    const genre = appStore.getGenre(genreId);

    appStore.store.removeCollection("genreCollection", genre);

    response.redirect("/dashboard");
  }

};

export default dashboardController;