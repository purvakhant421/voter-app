const express = require("express");
const userRoute = require("./user.route");
const partyRoute = require("./party.route");
const tokenRoute = require("./token.route");




const router = express.Router();

router.use("/user", userRoute);
router.use("/party", partyRoute);
router.use("/token", tokenRoute);

module.exports = router;