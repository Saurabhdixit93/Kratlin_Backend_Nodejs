const { Router } = require("express");
const router = Router();
const { newAccount, logInUser } = require("../controllers/UserController");

router.post("/sign_up", newAccount);
router.post("/login", logInUser);
module.exports = router;
