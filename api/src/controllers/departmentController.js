const Department = require("../models/Department");

class departmentController {
  //[POST]/api/department/create
  async create(req, res) {
    const { Departmentname } = req.body;

    try {
      //check
      const existingDepartmentname = await Department.findOne({
        Departmentname,
      });

      if (existingDepartmentname) {
        return res.status(200).json({ message: "Khoa đã tồn tại!" });
      } else {
        //create new Department
        const newDepartment = new Department({
          Departmentname: Departmentname,
        });

        //save departmentname and response
        const departmentname = await newDepartment.save();
        return res
          .status(200)
          .json({ message: "Khoa đã được tạo thành công." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //[GET]/api/department
  async getDepartment(req, res) {
    try {
      const Departments = await Department.find({});
      return res.status(200).json(Departments);
    } catch (error) {
      console.log(error);
    }
  }

  //[GET]/api/department/get
  async getone(req, res) {
    const { department } = req.body;
    try {
      const Departments = await Department.findOne({ _id: department });
      return res.status(200).json(Departments);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    const { name } = req.body;

    try {
      const Departments = await Department.findOne({
        Departmentname: name,
      });
      Departments && Departments.deleteOne();
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new departmentController();
