const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    account: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    departments: {
      type: Array,
      default: [],
    },
    department: {
      type: String,
      default: "",
    },
    group: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    isDepartment: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
