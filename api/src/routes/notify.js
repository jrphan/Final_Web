const router = require("express").Router();
const notifyController = require("../controllers/notifyController");

//create a post
router.post("/", notifyController.post);

//get new notify
router.get("/new", notifyController.getnew);

//get all notify
router.get("/all", notifyController.allnotify);

//get search notify
router.get("/department", notifyController.departmentnotify);

//get profile notify
router.get("/notifyprofile", notifyController.profilenotify);

//get a notify
router.get("/", notifyController.get);

//get a notify
router.get("/anotify", notifyController.anotify);

//patch edit notify
router.patch("/edit", notifyController.edit);

//delete a notify
router.delete("/delete", notifyController.delete);

module.exports = router;
