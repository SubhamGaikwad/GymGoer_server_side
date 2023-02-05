const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{type: String, require: true},
    email:{type:String, require:true, unique:true},
    userId:{type: String, unique: true},
    password:{type: String},
    isAdmin:false,
})

userSchema.pre("save", async  function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = async function(){
    return await jwt.sign({_id:this._id},process.env.JWT_SECRETE)
}
module.exports = mongoose.model("user", userSchema)