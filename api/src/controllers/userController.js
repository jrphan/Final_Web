const User = require("../models/User");

class userController {
  //[GET]/api/user/
  async get(req, res) {
    const userId = req.query.userId;
    const userName = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: userName });
      const { password, updateAt, ...other } = user._doc;
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  //[GET]/api/user/getallDepartment
  async getallDepartment(req, res) {
    try {
      const Departments = await User.find({ isDepartment: true });
      res.status(200).json(Departments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[GET]/api/user/getallStudent
  async getallUser(req, res) {
    try {
      const Departments = await User.find({ isStudent: true });
      res.status(200).json(Departments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[PATCH]/api/user/adddepartment
  async adddepartment(req, res) {
    const { username, depart } = req.body;
    try {
      const user = await User.findOne({ username: username });

      const Departments = user.departments;
      const updateDepart = [...Departments, depart];

      await user.updateOne({ departments: updateDepart });
      res.status(200).json({ message: "Thêm thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[PATCH]/api/user/info
  async info(req, res) {
    const { userId, name, group, depart } = req.body;
    try {
      const user = await User.findOne({ _id: userId });

      await user.updateOne({
        username: name,
        department: depart,
        group: group,
      });
      res.status(200).json({ message: "Chỉnh sửa thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[PATCH]/api/user/avatar
  async avatar(req, res) {
    const { userId, profilePicture } = req.body;
    try {
      const user = await User.findOne({ _id: userId });

      await user.updateOne({
        profilePicture: profilePicture,
      });
      res.status(200).json({ message: "Chỉnh sửa thành công" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[DELETE]/api/user/deleteuser
  async deleteuser(req, res) {
    const { name } = req.body;
    try {
      const Departments = await User.findOne({
        username: name,
      });
      Departments && Departments.deleteOne();
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userController();
