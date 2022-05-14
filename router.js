const router = require("express").Router();

const {
  getAllRespondents,
  getOneRespondent,
  addRespondent,
  updateRespondent,
  deleteRespondent,
} = require("./controllers/respondent.controller");

router.get("/resps", getAllRespondents);
router.get("/resp/:id", getOneRespondent);
router.post("/resp", addRespondent);
router.put("/resp/:id", updateRespondent);
router.delete("/resp/:id", deleteRespondent);

module.exports = router;
