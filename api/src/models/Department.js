const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    Departmentname: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
