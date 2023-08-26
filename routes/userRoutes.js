const express = require("express");
const {
  signUp,
  logIn,
  logout,
  getCurrent,
  changeUserAvatar,
} = require("../controllers/userControllers");
const { validateBody } = require("../middlewares/validateBody");
const { sighupShcema, loginShcema } = require("../joiShemas/userSchemsa");
const { middlewareAuth } = require("../middlewares/authMiddlewares");

const uploadAvatar = require("../middlewares/uploadAvatar");

const router = express.Router();

router.post("/signup", validateBody(sighupShcema), signUp);

router.post("/login", validateBody(loginShcema), logIn);

router.post("/logout", middlewareAuth, logout);

router.get("/current", middlewareAuth, getCurrent);

router.patch(
  "/avatar",
  middlewareAuth,
  uploadAvatar.single("avatar"),
  changeUserAvatar
);

module.exports = router;
