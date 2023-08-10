const { Router } = require("express");
const router = Router();
const UserRoutes = require("./UserRoutes");
const TaskRoutes = require("./TasksRoutes");

router.get("/", (req, res) => {
  return res.json("API WORKING");
});

router.use("/user", UserRoutes);
router.use("/task", TaskRoutes);

module.exports = router;
