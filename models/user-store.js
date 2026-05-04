import { v4 as uuidv4 } from "uuid";
import appStore from "./app-store.js";

const userStore = {

  getAllUsers() {
    return appStore.store.findAll("userCollection");
  },

  getUserByEmail(email) {
    const users = this.getAllUsers();
    return users.find(user => user.email === email);
  },

  addUser(user) {
  appStore.store.addCollection("userCollection", user);
}

};

export default userStore;