const router = require("express").Router();
const postController = require("../controllers/postController");

//create a post
router.post("/", postController.post);

//get all post
router.get("/", postController.get);

//like a post
router.put("/:id/like", postController.like);

//get user's all post
router.get("/profile/:userId", postController.postProfile);

//patch edit post
router.patch("/edit", postController.edit);

//delete a post
router.delete("/delete", postController.delete);

module.exports = router;
