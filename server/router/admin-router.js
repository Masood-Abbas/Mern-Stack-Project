const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware=require("../middleware/admin-middleware")

router.route("/users").get(authMiddleware,adminMiddleware,admincontroller.getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware,admincontroller.getUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,admincontroller.deleteUserById);
router.route("/contacts").get(authMiddleware,admincontroller.getAllContact);

module.exports = router;