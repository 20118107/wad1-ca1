'use strict';

import JsonStore from './json-store.js';

const appStore = {

  store: new JsonStore('./models/app-store.json', {
    info: {},
    genreCollection: []
  }),

  getAppInfo() {
    return this.store.findAll('info');
  },

  getAllGenres() {
    return this.store.findAll('genreCollection');
  },

  getGenre(id) {
    return this.store.findOneBy('genreCollection', genre => genre.id === id);
  }

};

export default appStore;