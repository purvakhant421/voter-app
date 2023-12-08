const express = require("express");
const routes = express.Router();
const { bjpController } = require("../controller/index");
const { auth } = require("../middleware/auth");
const { route } = require("./user");

routes.post("/register", bjpController.register);
routes.post("/login", bjpController.login);
routes.post("createbjp",bjpController.createBjp);
routes.get("/allbjp", bjpController.getAllBjp);

module.exports = routes;
