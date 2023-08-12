const express = require("express");
const {
  signUp,
  logIn,
  logout,
  getCurrent,
} = require("../controllers/userControllers");
const { validateBody } = require("../middlewares/validateBody");
const { sighupShcema, loginShcema } = require("../joiShemas/userSchemsa");
const { middlewareAuth } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/signup", validateBody(sighupShcema), signUp);
// додати валідацію
router.post("/login", validateBody(loginShcema), logIn);

router.post("/logout", middlewareAuth, logout);

router.get("/current", middlewareAuth, getCurrent);

module.exports = router;
