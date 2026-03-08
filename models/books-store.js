import JsonStore from './json-store.js';

const booksStore = new JsonStore('./models/books.json', { books: [] });

export default {
  getAllBooks() {
    return booksStore.findAll('books');
  },
  addBook(book) {
    booksStore.add('books', book);
  },
  getBookById(id) {
    return booksStore.findOneBy('books', { id });
  },
};