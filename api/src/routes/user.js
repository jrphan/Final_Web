const router = require("express").Router();
const userController = require("../controllers/userController");

//getall department
router.get("/getallDepartment", userController.getallDepartment);

//getall user
router.get("/getallStudent", userController.getallUser);

//get a user
router.get("/", userController.get);

//CHANGEPASS
router.patch("/adddepartment", userController.adddepartment);

//info
router.patch("/info", userController.info);

//info
router.patch("/avatar", userController.avatar);

//delete user
router.delete("/deleteuser", userController.deleteuser);

module.exports = router;
