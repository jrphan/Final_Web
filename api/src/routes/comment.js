const router = require("express").Router();
const commentController = require("../controllers/commentController");

//create a comment
router.post("/", commentController.comment);

//get all comment
router.get("/", commentController.get);

//delete comment
router.delete("/delete", commentController.delete);

//patch edit comment
router.patch("/edit", commentController.edit);

module.exports = router;
