const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post('/', userController.registerUser);
router.post('/auth', userController.authUser);
router.post('/logout', userController.logoutUser);


module.exports = router;
