const { partyService , emailService } = require("../services");

/** create party */
const createParty = async (req, res) => {
  try {
    const reqBody = req.body;
    const party = await partyService.createParty(reqBody);
    if (!party) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "Party create successfully!",
      data: { reqBody },
    });
  } catch (error) {
    res.status(400).json({ success: false, message:  error.message});
  }
};

/** Get party list */
const getPartyList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { party_name : { $regex: search, $options: "i" } },
      ];
    }
    const getList = await partyService.getPartyList(filter, options);

    res.status(200).json({
      success: true,
      message: "Get party list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete Party */
const deleteParty = async (req, res) => {
  try {
    const partyId = req.params.partyId;
    const partyExists = await partyService.getPartyById(partyId);
    if (!partyExists) {
      throw new Error("party not found!");
    }
    await partyService.deleteParty(partyId);

    res.status(200).json({
      success: true,
      message: "party delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Update party */
const updateParty = async (req, res) => {
  try {
    const reqBody = req.body;
    const partyId = req.params.bupartyId;
    const partyExists = await partyService.getPartyById(partyId);
    if (!partyExists) {
      throw new Error("party not found!");
    }
    await partyService.updateDetails(partyId,reqBody);

    res.status(200).json({
      success: true,
      message: "party update successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Send mail to reqested email */
const sendMail = async (req, res) => {
  try {
    const reqBody = req.body;
    const sendEmail = await emailService.sendMail(
      reqBody.email,
      reqBody.subject,
      reqBody.text
    );
    if (!sendEmail) {
      throw new Error("Something went wrong, please try again or later.");
    }
    res.status(200)
      .json({ success: true, message: "Email send successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createParty,
  getPartyList,
  deleteParty,
  updateParty,
  sendMail
};