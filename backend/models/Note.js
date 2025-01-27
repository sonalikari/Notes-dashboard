const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: [true, "Please add a title"],
  // },
  content: {
    type: String,
    required: [true, "Please add content"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // This references the User model
    required: true,
  },
}, {
  timestamps: true,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
