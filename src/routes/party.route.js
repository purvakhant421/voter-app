const express = require("express");
const { partyValidation } = require("../validations");
const { partyController } = require("../controllers");
const validate = require("../middlewares/validate");

const router = express.Router();

/** create party */
router.post(
  "/create-party",
  validate(partyValidation.createParty),
  partyController.createParty
);

/** party list */
router.get(
  "/list",
  partyController.getPartyList
)
/** party delete */
router.delete(
  "/delete/:partyId",
  partyController.deleteParty
)
/** party update */
router.put(
  "/update-party/:partyId",
  partyController.updateParty
)

/** Send mail */
router.post(
  "/send-mail",
  validate(partyValidation.sendMail),
  partyController.sendMail
);


module.exports = router;