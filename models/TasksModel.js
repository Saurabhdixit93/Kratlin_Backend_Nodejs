const { model, Schema } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    dueDate: {
      type: String,
      require: true,
    },
    completed: {
      type: String,
      default: "pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

const TaskModel = model("TaskModel", taskSchema);
module.exports = TaskModel;
