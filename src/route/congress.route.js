const express = require("express");
const routes = express.Router();
const { congressController } = require("../controller/index");
const { auth } = require("../middleware/auth");

routes.post("/register", congressController.register);
routes.post("/login", congressController.login);
routes.post("/creatcongress", congressController.createcongress);
routes.get("/allcongress", congressController.getAllCongress);

module.exports = routes;
