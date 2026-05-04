import userStore from "../models/user-store.js";
import { v4 as uuidv4 } from "uuid";

const accountsController = {

  index(req, res) {
    res.render("index", { title: "Welcome" });
  },

  signup(req, res) {
    res.render("signup", { title: "Sign Up" });
  },

  login(req, res) {
    res.render("login", { title: "Login" });
  },

  register(req, res) {

    const existingUser = userStore.getUserByEmail(req.body.email);

    if (existingUser) {
      return res.render("signup", {
        title: "Sign Up",
        error: "An account with this email already exists",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });
    }

    const password = req.body.password;

    if (
      password.length < 6 ||
      !password.match(/[A-Z]/) ||
      !password.match(/[0-9]/)
    ) {
      return res.render("signup", {
  title: "Sign Up",
  error: "Password must be at least 6 characters, include a capital letter and a number",
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email
});
    }

    const user = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password
    };

    userStore.addUser(user);

    res.redirect("/login");
  },

  authenticate(req, res) {
    const user = userStore.getUserByEmail(req.body.email);

    if (user && user.password === req.body.password) {

      res.cookie("library", user.email);

      return res.redirect("/start");
    } else {
      return res.redirect("/login");
    }
  },

  getCurrentUser(req) {
    if (!req.cookies || !req.cookies.library) return null;

    const userEmail = req.cookies.library;
    return userStore.getUserByEmail(userEmail);
  },

  logout(req, res) {
    res.clearCookie("library");
    res.redirect("/");
  }

};

export default accountsController;