const Post = require("../models/Post");
const User = require("../models/User");

class postController {
  //[POST]/api/post
  async post(req, res) {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json({ message: "Đăng bài thành công." });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/post
  async get(req, res) {
    let page = req.query._page;
    const size = 10;

    if (page) {
      page = parseInt(page);
      let start = (page - 1) * size;

      try {
        const posts = await Post.find({})
          .sort({ createdAt: -1 })
          .skip(start)
          .limit(size);

        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    } else {
      try {
        const posts = await Post.find({});
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  //[PUT]/api/post/:id/like
  async like(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("unliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/post/profile/:username
  async postProfile(req, res) {
    let page = req.query._page;
    const size = 9;
    page = parseInt(page);
    let start = (page - 1) * size;

    try {
      const user = await User.findOne({ _id: req.params.userId });
      const posts = await Post.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(size);
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[PATCH]/api/post/edit
  async edit(req, res) {
    const { id, desc } = req.body;
    try {
      const post = await Post.findOne({ _id: id });

      await post.updateOne({
        desc: desc,
      });
      res.status(200).json({ message: "Chỉnh sửa thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req, res) {
    const id = req.query.id;

    try {
      const posts = await Post.findOne({
        _id: id,
      });

      posts && posts.deleteOne();
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new postController();
