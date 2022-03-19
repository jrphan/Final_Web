const Comment = require("../models/Comment");

class commentController {
  //[POST]/api/comment
  async comment(req, res) {
    const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(200).json({ message: "Bình luận thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/comment
  async get(req, res) {
    const PostId = req.query.postId;

    try {
      const comments = await Comment.find({ PostId: PostId });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req, res) {
    const id = req.query.id;

    try {
      const comments = await Comment.findOne({
        _id: id,
      });

      comments && comments.deleteOne();
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log(error);
    }
  }

  

  //[PATCH]/api/comment/edit
  async edit(req, res) {
    const { id, update } = req.body;
    try {
      const comment = await Comment.findOne({ _id: id });

      await comment.updateOne({
        comment: update,
      });
      res.status(200).json({ message: "Chỉnh sửa thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new commentController();
