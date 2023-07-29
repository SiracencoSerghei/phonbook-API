const User = require('../db/models/userModel')


const signUp = async (req, res, next) => {
 const {name, email, password} = req.body;
 const user = await User.findOne({email})
 if(user) {
    res.status(409).json('User in use....');
    return
 }
 const newUser = new User({
    name,
    email,
    password
 })

}

module.exports = {
    signUp,

}