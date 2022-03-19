const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notify", NotifySchema);
