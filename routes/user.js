


const router = require("express").Router();

const {Register, Login ,Logout} = require("../controller/user")

router.route('/register').post(Register)

router.route('/login').post(Login)

router.route('/logout').get(Logout)



module.exports = router