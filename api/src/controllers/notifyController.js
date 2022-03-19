const Notify = require("../models/Notify");

class notifyController {
  //[GET]/api/notify/
  async get(req, res) {
    const notifyid = req.query.notifyid;
    try {
      const notify = await Notify.findById(notifyid);

      res.status(200).json(notify);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  //[GET]/api/notify/anotify
  async anotify(req, res) {
    const title = req.query.title;

    try {
      const notify = await Notify.findOne({ title: title });

      res.status(200).json(notify);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  //[POST]/api/notify
  async post(req, res) {
    const newNotify = new Notify(req.body);
    try {
      const savedNotify = await newNotify.save();
      res.status(200).json({ message: "Đăng bài thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/notify/new
  async getnew(req, res) {
    let page = req.query._page;
    const size = 7;

    page = parseInt(page);
    let start = (page - 1) * size;

    try {
      const notifies = await Notify.find({})
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(size);

      res.status(200).json(notifies);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

  //[GET]/api/notify/all
  async allnotify(req, res) {
    try {
      const notifies = await Notify.find({});
      res.status(200).json(notifies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/notify/department
  async departmentnotify(req, res) {
    const name = req.query.name;
    try {
      const notifies = await Notify.find({ department: name });
      res.status(200).json(notifies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/notify/department
  async profilenotify(req, res) {
    const userId = req.query.userId;
    try {
      const notifies = await Notify.find({ userId: userId });
      res.status(200).json(notifies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[PATCH]/api/notify/edit
  async edit(req, res) {
    const { id, title, desc } = req.body;
    try {
      const comment = await Notify.findOne({ _id: id });

      await comment.updateOne({
        title: title,
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
      const notifys = await Notify.findOne({
        _id: id,
      });

      notifys && notifys.deleteOne();
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new notifyController();
