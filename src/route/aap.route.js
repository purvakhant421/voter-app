const express = require("express");
const routes = express.Router();
const { aapController } = require("../controller/index");
const { auth } = require("../middleware/auth");

routes.post("/register", aapController.register);
routes.post("/login", aapController.login);
routes.post("creataap",aapController.createAap);
routes.get("/allaap", aapController.getAllAap);

module.exports = routes;
