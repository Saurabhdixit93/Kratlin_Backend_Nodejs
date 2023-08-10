const TaskModel = require("../models/TasksModel");

const newTask = async (req, res) => {
  const { title, desc, dueDate } = req.body;
  const { userId } = req.params;
  // Validation checks
  if (!title || !desc || !dueDate) {
    return res.json({
      message: "All fields are required",
      success: false,
    });
  }
  try {
    const newTask = await new TaskModel({
      title,
      desc,
      dueDate,
      user: userId,
    });
    return res.json({
      success: true,
      message: "Task Created",
      task: newTask,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

const getAllTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await TaskModel.find({ user: userId }).populate(
      "UserModel"
    );
    if (!tasks) {
      return res.json({
        success: false,
        message: "No tasks found ",
      });
    }
    if (tasks.length === 0) {
      return res.json({
        success: true,
        message: "No tasks found for the user.",
        tasks: [],
       
      });
    }
    return res.json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

const updateTask = async (req, res) => {
  const { title, desc, dueDate } = req.body;
  const { taskId } = req.params;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { title, desc, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.json({
        success: false,
        message: "Task not found",
      });
    }
    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

const completedTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.completed === "completed") {
      return res.json({
        success: false,
        message: "Task is already marked as completed",
      });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { completed: "completed" },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Task marked as completed",
      task: updatedTask,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

module.exports = {
  newTask,
  getAllTasks,
  deleteTask,
  updateTask,
  completedTask,
};
