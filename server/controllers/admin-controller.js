const User = require('../models/usermodel')

const getUser = async (req, res)=>{
    try {
        const users = await User.find({}, {password:0} );
        (users);
        if(!users || users.length === 0 ) {
            return res.status(404).json({massage: "users not found"})
        }
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    } 
}
module.exports = getUser;