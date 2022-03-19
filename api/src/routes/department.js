const router = require("express").Router();
const departmentController = require("../controllers/departmentController");

//create
router.post("/create", departmentController.create);

//get all
router.get("/", departmentController.getDepartment);

//get one
router.get("/get", departmentController.getone);

//delete one
router.delete("/delete", departmentController.delete);

module.exports = router;
