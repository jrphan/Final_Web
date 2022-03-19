const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    PostId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
