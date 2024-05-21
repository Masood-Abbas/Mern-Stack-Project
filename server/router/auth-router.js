const express = require('express');
const router = express.Router();
const authcontroller=require(`../controllers/auth-controller`)
const {signupSchema,loginSchema}=require(`../validators/auth-validator`)
const valid=require(`../middleware/validate-middleware`)
const authMiddleware = require("../middleware/auth-middleware");

router.route('/registration').post(valid(signupSchema),authcontroller.registration);
router.route('/login').post(valid(loginSchema),authcontroller.login);
router.route("/user").get( authMiddleware,authcontroller.user);

module.exports = router;