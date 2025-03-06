const express = require('express');
const { home, registration, login, resetPassword, forgetPassword, verifyResetCode, myInfo} = require('../controllers/auth-controller');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page');
});

router.route("/").get(home);
router.route("/registration").post(registration);
router.route("/login").post(login);
router.route("/myinfo").get(myInfo);
router.route("/forgot-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);
router.route("/verify-reset-code").post(verifyResetCode);

module.exports = router;