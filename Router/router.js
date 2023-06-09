const express = require("express");
const router = express.Router();

// const { UserRegister, UserLogin,aboutCheck,HomeCheck,} = require('../controller/user');

const { UserRegister, UserLogin, DataCheck, ContactSave,Logout} = require('../controller/user');
const { validUserCheck } = require("../middlware/auth");


router.post("/UserRegister", UserRegister);
router.post("/signin",UserLogin);

router.get('/about',validUserCheck,DataCheck);
router.get('/home',validUserCheck,DataCheck)
router.get('/contactApi',validUserCheck,DataCheck)
router.post('/contactSave',validUserCheck , ContactSave)
router.get('/logout',Logout)
module.exports = router;
