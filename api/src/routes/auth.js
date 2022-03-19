const router = require("express").Router();
const authController = require("../controllers/authController");

//REGISTER
router.post("/register", authController.register);

//LOGIN
router.post("/login", authController.login);

//CHANGEPASS
router.patch("/changepassword", authController.changePass);

//LOGIN GOOGLE
router.post("/logingoogle", authController.loginGoogle);

module.exports = router;
