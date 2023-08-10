const { Router } = require("express");
const router = Router();
const {
  newTask,
  getAllTasks,
  deleteTask,
  updateTask,
  completedTask,
} = require("../controllers/TaskController");

router.post("/new-task/:userId", newTask);
router.get("/get-tasks/:userId", getAllTasks);
router.delete("/delete-task/:taskId", deleteTask);
router.put("/update-task/:taskId", updateTask);
router.put("/completed/:taskId", completedTask);
module.exports = router;
