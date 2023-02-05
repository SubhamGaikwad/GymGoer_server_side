const User = require('../models/user');

exports.Register = async (req, res) => {

    try {

        const {name, email, userId, password} = req.body;

        let user = await User.findOne({userId});

        if(user) {
            return res.status(400).json({
                success: false,
                message: "User is Already Exits",
            })
        }else {

            user = await User.create({name, email, userId, password});

        res.status(200).json({
            success: true,
            user,
        })
        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}
exports.Login = async (req, res) => {

    try {

        const { userId, password} = req.body;

        let user = await User.findOne({userId}).select("+password");

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            })
        }

        const matchPassword = await user.matchPassword(password)

        const token = await user.generateToken();

        if(!matchPassword){
            res.status(200).json({
                success:false,
                message:"incorrect password"
            })
        }else{
            const options = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            if(matchPassword){
                res.status(200).cookie("token",token,options).json({
                    success:true,
                    user,
                    token
                })
            }
        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

exports.Logout = async (req, res) => {

    try {

        res.status(200)
        .cookie("token", null, {expires: new Date(Date.now()), httpOnly: true})
        .json({
            success: true,
            massage: "Logged Out",
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}